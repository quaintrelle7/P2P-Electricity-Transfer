//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract P2PElectricityTrading {
    // Define the Prosumer struct
    struct Prosumer {
        uint256 units;
        uint256 price;
        uint256 minPrice;
        uint256 lockingPeriod;
        uint256 rating;
        bool isProducer;
    }

    // Define the Bid struct
    struct Bid {
        uint256 units;
        uint256 price;
        address bidder;
        bool isHighestBid;
    }

    // Define the state variables
    mapping(address => Prosumer) public prosumers;
    Bid[] public bids;
    address public owner;
    uint256 public endTime;
    uint256 public minPrice;

    // Define the events
    event NewProducer(address indexed prosumer, uint256 units, uint256 price, uint256 minPrice, uint256 lockingPeriod);
    event NewConsumer(address indexed prosumer);
    event NewBid(address indexed bidder, uint256 units, uint256 price);
    event AuctionEnded(address indexed winner, uint256 units, uint256 price);

    constructor(uint256 _endTime, uint256 _minPrice) {
        owner = msg.sender;
        endTime = _endTime;
        minPrice = _minPrice;
    }

    // Define the functions
    function addProducer(uint256 _units, uint256 _price, uint256 _minPrice, uint256 _lockingPeriod, uint256 _rating) external {
        require(_units > 0 && _price > 0 && _minPrice > 0 && _lockingPeriod > 0, "Invalid input parameters");
        prosumers[msg.sender] = Prosumer(_units, _price, _minPrice, _lockingPeriod, _rating, true);
        emit NewProducer(msg.sender, _units, _price, _minPrice, _lockingPeriod);
    }

    function addConsumer(uint256 _rating) external {
        prosumers[msg.sender] = Prosumer(0, 0, 0, 0, _rating, false);
        emit NewConsumer(msg.sender);
    }

    function placeBid(uint256 _units, uint256 _price) external {
    require(_units > 0 && _price > 0, "Invalid input parameters");
    require(prosumers[msg.sender].rating > 0, "Consumer has no rating");
    require(prosumers[msg.sender].minPrice < _price, "Bid price is lower than the minimum price");

    uint256 highestBid = 0;
    for (uint256 i = 0; i < bids.length; i++) {
        if (bids[i].price > highestBid) {
            highestBid = bids[i].price;
        }
    }

    require(_price > highestBid, "Bid price must be higher than the current highest bid");

    bids.push(Bid(_units, _price, msg.sender, true));
    emit NewBid(msg.sender, _units, _price);
    }
    
    function endAuction() external {
    require(block.timestamp >= endTime, "Auction has not ended yet");

    uint256 highestBid = 0;
    uint256 highestBidIndex;
    address highestBidder;

    for (uint256 i = 0; i < bids.length; i++) {
        Bid memory bid = bids[i];
        if (bid.price > highestBid && bid.units <= prosumers[msg.sender].units) {
            highestBid = bid.price;
            highestBidIndex = i;
            highestBidder = bid.bidder;
        }
    }

    if (highestBid > 0) {
        prosumers[msg.sender].units -= bids[highestBidIndex].units;
        prosumers[msg.sender].rating += 1;
        bids[highestBidIndex].isHighestBid = true;
        emit AuctionEnded(highestBidder, bids[highestBidIndex].units, bids[highestBidIndex].price);

        for (uint256 i = 0; i < bids.length; i++) {
            Bid memory bid = bids[i];
            if (!bid.isHighestBid && bid.bidder == msg.sender) {
                payable(bid.bidder).transfer(bid.units * bid.price);
            }
        }
    } else {
        prosumers[msg.sender].rating -= 1;
    }

    delete bids;
    endTime = 0;
    }
}