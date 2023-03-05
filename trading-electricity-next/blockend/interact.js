import web3 from './web3'

const AuctionAbi = require('./build/auction.json')

const contractAddress = "0x0f2CB1000B9685D3f51878eA64825db2386FDb1A"

//Created an instance , add create an object of "abi"

export const AuctionContract = new web3.eth.Contract(
    AuctionAbi, contractAddress
)