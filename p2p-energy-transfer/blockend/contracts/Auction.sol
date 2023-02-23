// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

 //Sign the message to become a seller/buyer

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
        uint256 lockinPeriod;
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
    Counters.Counter public _listingIdCount;


    function listElectricity(uint256 _units, uint256 _price, uint256 _lockinPeriod) external {
        
        uint256 listingId = _listingIdCount.current();
        _listingIdCount.increment();
        uint256 _timestamp= block.timestamp;

        listMap[listingId] = Prosumer(
            
            listingId,
            _units,
            _price,
            _lockinPeriod,
            _timestamp,
            msg.sender,
            Status.ADDED
        );

    }

    //

   
    function placeBid(uint256 _bidAmount, uint256 _listingId, uint256 _bidUnits) external payable{

        require(listMap[_listingId].status == Status.ADDED, "Listing not available!");
        // Lock the bidding amount
        require(msg.value >= (_bidAmount*_bidUnits), "Insufficient Amount!");

        require(block.timestamp <= listMap[_listingId].lockingPeriod + listMap[_listingId].timestamp, "Bid has been expired!");

        

    }


    


}