import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import web3 from 'blockend/web3'
const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  // web3.eth.getAccounts().then(console.log);

  // const accounts = web3.eth.requestAccounts();

   

  return (

    
    <div>
 <div className= {styles.heading}> 
            <h1 style={{color:'white', fontFamily:"Arial"}}>Welcome to P2P Electricity Transfer Network!</h1>
            <button className='btn'>Connect Wallet</button>
           
    </div>
    <h1>"Hi" + {accounts[0]}</h1>
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

