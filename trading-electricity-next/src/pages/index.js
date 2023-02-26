import web3 from 'blockend/web3'
import { useEffect, useState } from 'react';



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


  return (

    
    <div>
 <div> 
            <h1 style={{color:'white', fontFamily:"Arial"}}>Welcome to P2P Electricity Transfer Network!</h1>
            <button className='btn'>Connect Wallet</button>
           
    </div>
    
    <h3  style={{color:'white', marginTop:'70px'}}>Hello  {account}! </h3>
    <h2 style={{color:'white', marginTop:'70px', fontFamily:"Arial"}}>Ongoing Bids</h2>

    <table className='table-1'>
    <tbody>
      <tr>
        <th>Listing Address</th>
        <th>Units Available</th>
        <th>Price</th>
        <th>Source</th>
        <th>Buy</th>
      </tr>
      <tr>
        <td>xy</td>
        <td>ab</td>
        <td>cd</td>
        <td>th</td>
        <td><button style={{backgroundColor:"#9cecdb", width:"12vh", height:"30px", borderRadius:"5px" }}>buy</button></td>
      </tr>
      </tbody>
    </table>
    </div>
  )
}

