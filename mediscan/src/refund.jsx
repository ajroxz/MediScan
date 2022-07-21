import React, { useEffect, useReducer, useState } from "react";
//import "./App.css"
import "./index.css"
import "./style/main.css"
import App from "./App.jsx"
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import {Link} from 'react-router-dom';
import NavBar from "./navbar";
import Footer from "./footer";

  

function Refund() {
  
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


  async function refund (){

        const {web3,contract} = web3Api;

        await contract.refund({
            from : account,
            gas: 3000000
          })
 
        // await contract.createReport("0x3f88e2e97FCDEAfBa12b64e2696d5A048EAD65Bc","he is good","111",{
        //     from:account,
        //     gas: 3000000
        //   })
      
  } 

  
  
  return (
    <div>
    <NavBar/>
    <div className="flex justify-center">
      
      <button required type="get refund" onClick={refund} className="rounded shadow-xl bg-cyan-300 px-6 py3 hover:bg-cyan-400 cursor-pointer my-2 border border-cyan-300 transition-all duration-300 text-white uppercase">Get Refund</button>
      
    
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <Footer/>
    </div>
  );
}

export default Refund;









