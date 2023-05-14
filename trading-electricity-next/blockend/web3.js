import Web3 from "web3";

let web3;

if(typeof window!=="undefined" && typeof window.ethereum !== "undefined"){
    window.ethereum.request({method: "eth_requestAccounts"});
    web3 = new Web3(window.ethereum);
}
else{

    const provider = new Web3.providers.HttpProvider(  
   'https://polygon-mumbai.g.alchemy.com/v2/cNZhkVFPVIileSpGtOeahsFjCFU5sn_h');

    web3 = new Web3(provider);
}


// export default web3;

import { Banana } from '@rize-labs/banana-wallet-sdk/dist/BananaProvider'
import { Chains } from '@rize-labs/banana-wallet-sdk/dist/Constants'

/**
 * Banana Module:
 * This module will be responsible to deliver everything related to account abstraction
 * ,smart contract wallets and touchId authentication i.e aaProvider, walletAddress, walletapi etc
 */

/*
 * Banana Module Initialization
 * @params chain enum and JsonRpcUrl
 * @returns Banana Class instance
 */
const jsonRpcUrl =    'https://polygon-mumbai.g.alchemy.com/v2/cNZhkVFPVIileSpGtOeahsFjCFU5sn_h';
const bananaInstance = new Banana(Chains.mumbai, jsonRpcUrl);

/*
 * @params none
 * @returns walletName: string
 * accessed from banana instance and used to fetch walletname.
 * cached in user's cookie storage 
 */
const walletName: string = bananaInstance.getWalletName();

// In case walletName is not fetched, the dev needs to prompt the user to enter the walletName which he had
// previously used with the dapp. In case user hasn't created any wallet with the dapp dev can promt
// user for new wallet name for his wallet.

/*
 * @params walletName: string
 * @returns isUnique: bool
 * @nature async
 * accessed form banana instance and be used to check if walletName 
 * for new wallet provided by user is unique or not
 */
const isUnqiue: boolean = await bananaInstance.isWalletNameUnique(walletName);

// when user don't posses any wallet corresponding to walletName username 
const walletCreationResponse = await bananaInstance.createWallet(walletName);

// when user already have a wallet with username walletName. This username can be given directly by user
// or fetched by dev using getWalletName() method
const walletConnectionResponse = await bananaInstance.connectWallet(walletName);

// method which returns provider which can be further used to retreive signer and initialize contract
const bananaProvider = await bananaInstance.getBananaProvider();

// extracting aaSigner
const bananaSigner = bananaProvider.getSigner();

// initializing sample greeter contract with aaSigner
const GreeterContract = new ethers.Contract(
     addresses.Greeter,
     GreeterArtifact.abi,
     bananaSigner
   );

// greeter contract greet calldata
const greetCallData = GreeterContract.interface.encodeFunctionData(
      "greet",
       []
    );

/*
 * @params functionCalldata: bytes, walletAddress: string, address: string, value: double
 * @return transaction hash
 * @nature async
 */
const txn = await bananaInstance.execute(greetCallData, Greeter.address, amount);

// Similary for signing and verifying message the flow looks like

/**
 * @method verify
 * @param { string } signaure, { string } messageSigned, { string } eoaAddress
 * @returns { boolean } isVerified
 * method to verify message against signature
 */
const sampleMsg = "Hello World";
const eoaAddress = bananaInstance.getEOAAddress();
const signMessageResponse = await bananaInstance.signMessage(sampleMsg);
const messageSigned = signMessageResponse.messageSigned;
const signatuer = signMessageResponse.signature;
const signedMessage = await bananaInstance.verifySignature(signature, messageSigned, eoaAddress);