import React from 'react'
import { AuctionContract } from 'blockend/interact'
import { useState, useEffect } from 'react';
import web3 from 'blockend/web3';

export default function MyPortal() {

    const[account, setAccount] = useState('');
    const[state, setState] = useState({
        units:'',
        price:'',
        lockingPeriod:'',
        errorMessage:'',
        loading: false
    });
   
    function handleInputChange(event){
        const{name, value} = event.target;
        setState(prevState => ({
            ...prevState, [name]: value
        }));
    }

    useEffect(() => {
            const getAccount = async () => {
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
            };
            getAccount();
            }, []);
    
    const handleSubmit = async(event) =>{
        
        event.preventDefault();

        

        setState({loading:true});
        try{

            //get the account address to make the transaction
            const accounts = await web3.eth.requestAccounts();

            const tx = await AuctionContract.methods.listElectricity
            (state.units, state.price, state.lockingPeriod)
            .send({ from: accounts[0] });

            console.log(tx);

            

        }
        catch(err){
            setState({errorMessage: err.message});

        }
        
    };

  return (
    <div>
    <h1 style={{color:'white', fontFamily:"Arial", marginBottom:"40px"}}>My Energy Portal!</h1>

    <div className='myportal' style={{display:"flex", flexDirection:"row", flexWrap: "nowrap", justifyContent:"space-around"}}>

        <div>
            <div className="myportal-left" style={{border: "1px solid white", padding: "40px", borderRadius:"10px", width: "55vh", height:"20vw", backgroundColor:"#bdf6ea"}}>

            <h3 style={{fontFamily:"Arial", marginBottom:"20px", marginLeft:"60px"}}>Input Energy Details</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <input name="units"
                           value={state.units}
                           onChange={handleInputChange}
                           placeholder='    Units in KW' 
                           style={{marginRight:"0px", width:"42vh", borderColor:"#0bcda4"}}
                           required="true"></input>
                </div>

                <div>
                    <input name="price"
                           value={state.price}
                           onChange={handleInputChange}
                           placeholder='    Price in Eth' 
                           style={{marginTop:"20px", width:"42vh", borderColor:"#0bcda4"}}
                           required="true"></input>
                </div>
               
               

                    <input name="lockingPeriod"
                           value={state.lockingPeriod}
                           onChange={handleInputChange}
                           placeholder='    Lock-In Period' 
                           style={{marginTop:"10px",width:"42vh", borderColor:"#0bcda4"}}
                           required="true"></input>
                
                
                <button className='btn' style={{marginTop:"30px", marginLeft:"10vh", backgroundColor:"#0bcda4", color:"black", borderColor:"white"}}>Submit</button>
            </form>
            </div>
        </div>


            <div>
            <div className="myportal-right" style={{border: "1px solid white", padding: "40px", borderRadius:"10px", width: "55vh", backgroundColor:"#bdf6ea", height:"20vw"}}>

            <h3 style={{fontFamily:"Arial", marginBottom:"20px", marginLeft:"60px"}}>My Recent Purchase</h3>
                <div>
                    <h4 style={{fontFamily:"Arial", marginTop:"40px"}}>Listing Address: {account} </h4>
                    <h4 style={{fontFamily:"Arial", marginTop:"20px"}}>Seller Address: </h4>


                   <h4 style={{fontFamily:"Arial", marginTop:"20px"}}>Energy Units:{state.units} </h4>
                   <h4 style={{fontFamily:"Arial", marginTop:"20px"}}>Total Price: </h4>
                   <h4 style={{fontFamily:"Arial", marginTop:"20px"}}>Source of Energy: </h4>




                </div>

               
                
            </div>
        </div>
    </div>
    </div>
  )
}
