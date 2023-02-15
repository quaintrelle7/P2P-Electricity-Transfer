import React from 'react'
import '../styles/globals.css'

export default function MyPortal() {
  return (
    <div className='myportal'>
        <div>
            <div className="myportal-left" style={{border: "1px solid white", padding: "40px", borderRadius:"10px", width: "55vh", backgroundColor:"springgreen"}}>
                <div>
                    <input placeholder='    Units in KW' style={{marginRight:"0px", width:"42vh"}}></input>
                </div>

                <div>
                    <input placeholder='    Price in Eth' style={{marginTop:"20px", width:"42vh"}}></input>
                </div>
               
                <div style={{marginTop:"20px"}}>
                    <input placeholder='    Minimum Price' style={{marginRight:"5px"}}></input>
                    <input placeholder='    Maximum Price' style={{marginLeft:"10px"}}></input>
                </div>
                
                <button className='btn' style={{marginTop:"30px", marginLeft:"10vh", backgroundColor:"#222A35"}}>Submit</button>
            </div>
        </div>

    </div>
  )
}
