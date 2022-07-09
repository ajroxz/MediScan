import React, { useEffect, useReducer, useState } from "react";
//import "./App.css"
import "./index.css"
import "./style/main.css"
import App from "./App.jsx"
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import {Link} from 'react-router-dom';

  

function Appointment() {
  
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract :null,
  });

  const [account, setAccount] = useState(null);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("MediScan", provider);

      if (provider) {
        setAccountListener(provider);
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
      
        });
      } else {
        console.error("Please install MetaMask!");
      }

      
    
    };

    loadProvider();
  }, []);

  

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);

      // console.log(accounts);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  // console.log(web3Api.web3)

  async function appointment (val){

        const {web3,contract} = web3Api;

        // await contract.appointment({
        //   from:account,
        //   gas: 3000000,
        //   value : val
        // })

        const withdrawAmout = web3.utils.toWei(val, "ether");
     
      await contract.appointment({
       from : account,
       gas: 3000000,
       value : withdrawAmout
      });

        console.log(val);
 
        // await contract.createReport("0x3f88e2e97FCDEAfBa12b64e2696d5A048EAD65Bc","he is good","111",{
        //     from:account,
        //     gas: 3000000
        //   })
      
  } 

  let [data, setData] = useState({
    value : 0
  });

  const handleChange = (e) => {
    data[e.target.id] = e.target.value
    setData({...data, [e.target.id]:e.target.value})
    console.log(data)
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    appointment(data.value)
    console.log(data);
  };
  
  return (
   
    <div className="flex justify-center">
      <form className="flex flex-col bg-white p-8 m-20 w-96 shadow-xl rounded form-data" >
      <p className="h-2 my-5 text-center uppercase font-semibold text-cyan-500 shadow-lg">Create Report</p>
      <label id="name" className="text-xs text-gray-600 px1 py1">Amount</label>
      <input required type="text" placeholder="Enter Amount" onChange={handleChange} id="value" value ={data.address} className="input-field mb-2 px3 py3 rounded outline-none border"/>
      
      <input required type="submit" onClick={handleSubmit} className="rounded shadow-xl bg-cyan-300 px-6 py3 hover:bg-cyan-400 cursor-pointer my-2 border border-cyan-300 transition-all duration-300 text-white uppercase"/>
      {/* <h5 className="text-m text-gray-600 px1 py1" >Are you doctor?  <Link to="/doctor">click Here!</Link></h5> */}
      </form>
    
    </div>
  );
}

export default Appointment;









