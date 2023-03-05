import web3 from 'blockend/web3'
import { useEffect, useState } from 'react';
import  {AuctionContract}  from 'blockend/interact';
import Link from 'next/link';

export default function Home() {

  web3.eth.getAccounts().then(console.log);

   const [account, setAccount] = useState('');

  useEffect(() => {
  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };
  getAccount();
}, []);

const[data, setData] = useState('');

useEffect(()=>{
  async function fetchData(){
    const accounts = await web3.eth.requestAccounts();
    const result = await AuctionContract.methods.getAllListings().call();
    setData(result);
  }
  fetchData();

}, [])


const[listingAddress, setListingAddress] = useState('');

  // useEffect(() => {
  //   const getListingAddress = async () => {
  //     if (AuctionContract) {
  //       const listing = await AuctionContract.methods.getAllListings(listingId).call();
  //       setListingAddress(listing.address);
  //     }
  //   };

  //   getListingAddress();
  // }, [AuctionContract]);

   const handleSubmit = async( _listingId,  _units) =>{
      
        

      

            //get the account address to make the transaction
            const accounts = await web3.eth.requestAccounts();

            const tx = await AuctionContract.methods.placeBid
            (_listingId, _units)
            .send({ from: accounts[0] });


            

      
        
    };

  return (

    
    <div>
 <div> 
            <h1 style={{color:'white', fontFamily:"Arial"}}>Welcome to P2P Electricity Transfer Network!</h1>
            {/* <button className='btn'>Connect Wallet</button> */}
           
    </div>
    
    <div style={{display:"flex", justifyContent:"space-between"}}>
    <h3  style={{color:'white', marginTop:'70px'}}>Hello  {account}! </h3>
    <Link href="/MyPortal" style={{color:'white', marginTop:'70px', fontSize:"20px", fontWeight:"Bold"}}>Go to MyPortal </Link>
    </div>
    <h2 style={{color:'white', marginTop:'70px', fontFamily:"Arial"}}>Ongoing Bids</h2>

    <table className='table-1'>
    <tbody>
      <tr>
        <th>Seller Address</th>
        <th>Units Available</th>
        <th>Price</th>
        <th>Buy</th>
      </tr>
    
      {data && data.map((item, index)=>(
         <tr key={index}>
        <td>{item.prosumer}</td>
        <td>{item.units}</td>
        <td>{item.price}</td>
        <td><button onSubmit={handleSubmit(item.listingId, item.units)} style={{backgroundColor:"#9cecdb", width:"12vh", height:"30px", borderRadius:"5px", cursor:"pointer"}}>buy</button></td>
      </tr>
      ))}
    
     
      </tbody>
    </table>

    </div>
  )
}

