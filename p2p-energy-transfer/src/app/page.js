import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
    <div className= {styles.heading}> 
            <h1 style={{color:'white'}}>Welcome to P2P Electricity Transfer Network!</h1>
            <button className='btn'>Connect Wallet</button>
    </div>
    <h2 style={{color:'white', marginTop:'70px'}}>Ongoing Bids</h2>

    <table className='table-1'>
      <tr>
        <th>Seller</th>
        <th>Units Available</th>
        <th>Price</th>
        <th>Source</th>
        <th>Buy/Rating</th>
      </tr>
      <tr>
        <td>xy</td>
        <td>ab</td>
        <td>cd</td>
        <td>th</td>
        <td>bj</td>
      </tr>
    </table>
    </div>
  )
}
