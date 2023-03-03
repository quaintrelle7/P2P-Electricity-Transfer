// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*

    @title P2P
    @dev A smart contract for peer-to-peer electricity trading.
    Allows prosumers to list available electricity with units, price and locking period,
    and consumers to place bids on the listings. The highest bidder for a listing can finalize the bid
    after the locking period is over, and the prosumer receives the payment and units are deducted
    from the listing. Consumers can also withdraw their bids before the locking period is over.
    Listing can be in pending, added, expired or revoked status.
*/

contract P2P {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    enum Status{
        PENDING, 
        ADDED,
        EXPIRED,
        REVOKED 
    }

    struct Prosumer{
        uint256 listingId; //For different Listing
        uint256 units;
        uint256 price;
        uint256 lockingPeriod;
        uint256 timestamp;
        address prosumer;
        Status status;
        //All users are consumers
    }

    struct Bid{
        address bidder;
        uint256 biddingAmount;
        uint256 biddingUnits;
        uint256 listingId;
        bool isHighestBid;
    }

    mapping (uint256 => Prosumer) listMap;
    mapping (uint256 => Bid) public bidMap;

    Counters.Counter public _listingIdCount;
    Counters.Counter public _bidIdCount;


    event BidPlaced(uint256 bidId, address indexed bidder, uint256 biddingAmount, uint256 biddingUnits, uint256 indexed listingId);
    event ListingAdded(uint256 indexed listingId, uint256 units, uint256 price, uint256 lockingPeriod, address indexed prosumer);

    function listElectricity(uint256 _units, uint256 _price, uint256 _lockingPeriod) external {
        uint256 listingId = _listingIdCount.current();
        _listingIdCount.increment();
        uint256 _timestamp= block.timestamp;

        listMap[listingId] = Prosumer(
            listingId,
            _units,
            _price,
            _lockingPeriod,
            _timestamp,
            msg.sender,
            Status.ADDED
        );

    emit ListingAdded(listingId, _units, _price, _lockingPeriod, msg.sender);

    }

    function placeBid(uint256 _listingId, uint256 _bidUnits) external payable{
        require(listMap[_listingId].status == Status.ADDED, "Listing not available!");
        require(msg.value > 0, "Invalid Bid!");
        require(block.timestamp <= listMap[_listingId].lockingPeriod.add(listMap[_listingId].timestamp), "Bid has been expired!");
        require(msg.value >= (listMap[_listingId].price.mul(_bidUnits)), "Insufficient Amount!");

        uint256 bidId = _bidIdCount.current();
        _bidIdCount.increment();

        if(bidMap[_listingId].biddingAmount < msg.value) {
            bidMap[_listingId].isHighestBid = false;
        }

        bidMap[bidId] = Bid(
            msg.sender,
            msg.value,
            _bidUnits,
            _listingId,
            true
        );

        emit BidPlaced(bidId, msg.sender, msg.value, _bidUnits, _listingId);

    }

    function withdrawBid(uint256 _listingId) external {
        require(bidMap[_listingId].bidder == msg.sender, "Not authorized to withdraw the bid!");
        require(block.timestamp > listMap[_listingId].lockingPeriod.add(listMap[_listingId].timestamp), "Can't withdraw the bid before locking period!");

        payable(msg.sender).transfer(bidMap[_listingId].biddingAmount);

        delete bidMap[_listingId];
    }

    function finalizeBid(uint256 _listingId) external {
        require(listMap[_listingId].status == Status.ADDED, "Listing not available!");
        require(block.timestamp > listMap[_listingId].lockingPeriod.add(listMap[_listingId].timestamp), "Can't finalize bid before locking period!");
        
        Bid memory winningBid = bidMap[_listingId];
        require(winningBid.isHighestBid, "No valid bid found for the listing!");

        address payable prosumer = payable(listMap[_listingId].prosumer);
        uint256 totalAmount = winningBid.biddingAmount;
        uint256 unitsSold = winningBid.biddingUnits;

        payable(prosumer).transfer(totalAmount);

        listMap[_listingId].units = listMap[_listingId].units.sub(unitsSold);

        if(listMap[_listingId].units == 0) {
            listMap[_listingId].status = Status.EXPIRED;
        }

        delete bidMap[_listingId];
    }

    function getListing(uint256, uint256, uint256, uint256, address)public view returns()
    {
        return(

            listingI
                // listingId, _units, _price, _lockingPeriod, msg.sender
        );
    }

}