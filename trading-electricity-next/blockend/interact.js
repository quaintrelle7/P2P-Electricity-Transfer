import web3 from './web3'

const AuctionAbi = require('./build/auction.json')

const contractAddress = "0xdb0160E6848aC5bcfF7bCfC6ED5383A6aa307572"

//Created an instance , add create an object of "abi"

export const AuctionContract = new web3.eth.Contract(
    AuctionAbi, contractAddress
)