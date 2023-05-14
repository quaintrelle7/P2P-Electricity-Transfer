
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract P2PElectricityTrading {

    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _listingIds;

    enum Status { ADDED, EXPIRED, SOLD }

    struct Producer {
        uint256 listingId;
        uint256 units;
        uint256 pricePerUnit;
        uint256 listingPeriod;
        uint256 timestamp;
        address producer;
        Status status;
    }

    struct Buyer {
        uint256 unitsToBuy;
        address consumer;
        uint256 amount;
    }

    mapping(uint256 => Producer) public producers;
    mapping(address => Buyer) public buyers;

    event ListingAdded(uint256 listingId, address producer);
    event UnitsPurchased(uint256 listingId, address buyer, uint256 units);

    function addListing(uint256 units, uint256 pricePerUnit, uint256 listingPeriod) public {
        _listingIds.increment();
        uint256 newListingId = _listingIds.current();
        producers[newListingId] = Producer(newListingId, units, pricePerUnit, listingPeriod, block.timestamp, msg.sender, Status.ADDED);
        emit ListingAdded(newListingId, msg.sender);
    }

    function buyUnits(uint256 listingId, uint256 unitsToBuy) public payable {
        Producer storage producer = producers[listingId];
        require(block.timestamp < producer.timestamp.add(producer.listingPeriod), "Listing has expired.");
        // require(producer.units >= unitsToBuy, "Not enough units available.");
        // require(producer.pricePerUnit.mul(unitsToBuy) == msg.value, "Incorrect value sent.");

        producer.units = producer.units.sub(unitsToBuy);
        if(producer.units == 0) {
            producer.status = Status.SOLD;
        }

        buyers[msg.sender] = Buyer(unitsToBuy, msg.sender, msg.value);
        payable(producer.producer).transfer(msg.value);
        emit UnitsPurchased(listingId, msg.sender, unitsToBuy);
    }

    function checkListing(uint256 listingId) public {
        Producer storage producer = producers[listingId];
        if(block.timestamp > producer.timestamp.add(producer.listingPeriod) && producer.status == Status.ADDED) {
            producer.status = Status.EXPIRED;
        }
    }

    function getAllListingIds() public view returns (uint256[] memory) {
    uint256[] memory listingIds = new uint256[](_listingIds.current());
    for (uint256 i = 0; i < _listingIds.current(); i++) {
        listingIds[i] = i+1;
    }
    return listingIds;
}

    function getListingDetails(uint256 listingId) public view returns (uint256, uint256, uint256, uint256, uint256, address, Status) {
    Producer storage producer = producers[listingId];
    return (
        producer.listingId,
        producer.units,
        producer.pricePerUnit,
        producer.listingPeriod,
        producer.timestamp,
        producer.producer,
        producer.status
    );
    }
}
