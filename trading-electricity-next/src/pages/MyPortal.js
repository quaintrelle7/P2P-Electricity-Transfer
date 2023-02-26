import React from 'react'

export default function MyPortal() {
  return (
    <div>
    <h1 style={{color:'white', fontFamily:"Arial", marginBottom:"40px"}}>My Energy Portal!</h1>

    <div className='myportal' style={{display:"flex", justifyContent:"space-around"}}>

        <div>
            <div className="myportal-left" style={{border: "1px solid white", padding: "40px", borderRadius:"10px", width: "55vh", backgroundColor:"#bdf6ea"}}>

            <h3 style={{fontFamily:"Arial", marginBottom:"20px", marginLeft:"60px"}}>Input Energy Details</h3>
                <div>
                    <input placeholder='    Units in KW' style={{marginRight:"0px", width:"42vh", borderColor:"#0bcda4"}}></input>
                </div>

                <div>
                    <input placeholder='    Price in Eth' style={{marginTop:"20px", width:"42vh", borderColor:"#0bcda4"}}></input>
                </div>
               
                <div style={{marginTop:"20px"}}>
                    <input placeholder='    Source' style={{marginRight:"5px", borderColor:"#0bcda4"}}></input>
                    <input placeholder='    Lock-In Period' style={{marginLeft:"10px", borderColor:"#0bcda4"}}></input>
                </div>
                
                <button className='btn' style={{marginTop:"30px", marginLeft:"10vh", backgroundColor:"#0bcda4", color:"black", borderColor:"white"}}>Submit</button>
            </div>
        </div>


            <div>
            <div className="myportal-right" style={{border: "1px solid white", padding: "40px", borderRadius:"10px", width: "55vh", backgroundColor:"#bdf6ea", height:"353.2px"}}>

            <h3 style={{fontFamily:"Arial", marginBottom:"20px", marginLeft:"60px"}}>My Recent Purchase</h3>
                <div>
                    <h4 style={{fontFamily:"Arial", marginTop:"40px"}}>Listing Address: </h4>
                    <h4 style={{fontFamily:"Arial", marginTop:"20px"}}>Seller Address: </h4>


                   <h4 style={{fontFamily:"Arial", marginTop:"20px"}}>Energy Units: </h4>
                   <h4 style={{fontFamily:"Arial", marginTop:"20px"}}>Total Price: </h4>
                   <h4 style={{fontFamily:"Arial", marginTop:"20px"}}>Source of Energy: </h4>




                </div>

               
                
            </div>
        </div>
    </div>
    </div>
  )
}
