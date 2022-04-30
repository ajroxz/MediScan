import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {

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

      if(contract.signUp){
        console.log("working")
        
        const ck = async()=>{
          var a = await contract.checkBal()

          console.log(a)
        }

        ck();

        
      }
      else
      {
        console.log("not working")
      }
      // let provider = null;
      // if (window.ethereum) {
      //   provider = window.ethereum;
      //   try {
      //     await provider.enable();
      //   } catch {
      //     console.error("User is not allowed");
      //   }
      // } else if (window.web3) {
      //   provider = window.web3.currentProvider;
      // } else if (!process.env.production) {
      //   provider = new Web3.providers.HttpProvider("http://localhost:7545");
      // }

      // setWeb3Api({
      //   web3: new Web3(provider),
      //   provider,
      // })
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

  const signUP = async()=>{
    const {web3,contract} = web3Api;
    // const accounts = await web3Api.web3.eth.getAccounts();
    if(contract.createReport)
    {
      const withdrawAmout = web3.utils.toWei("2", "ether");
      const acc ="0xeee03eB0E0FdcF5a08112cBe8eb7c711D894e691";
      await contract.signUp(acc,withdrawAmout,{

        
       from : account
       
  
        
      });
    }
  }

  // signUP();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.

          &nbsp;
          <button type="button" className="btn btn-success " onClick={signUP}>
            Transfer
          </button>
          &nbsp;
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>

     
    </div>
  );
}

export default App;
