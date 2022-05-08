import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import Demo from './components/Demo'

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

  const appointment = async()=>{
    const {web3,contract} = web3Api;
    // const accounts = await web3Api.web3.eth.getAccounts();
      const withdrawAmout = web3.utils.toWei("0.2", "ether");
     
      await contract.appointment({

        
       from : account,

       value : withdrawAmout
       
  
        
      });
    
  }

  const getPatient = async()=>{

    const {web3,contract} = web3Api;

    const response = await contract.getPatient(account,{
      from:account,
      gas: 3000000
    }).then(result => console.log(result[0])).catch(e=>console.log(e))

    

  }

  const getPatient_ = getPatient

  

  // const registerPatient = async()=>{
  //   const {web3,contract} = web3Api;

  //   await contract.registerPatient("Narendra Modi",60,"AB-","Male","India",
  //     {
  //       from:account,
  //       gas:3000000
  //     })
  // }

  async function registerPatient (Name,Age,BloodGroup,Gender,Country){
    const {web3,contract} = web3Api;

    await contract.registerPatient(Name,Age,BloodGroup,Gender,Country,
      {
        from:account,
        gas:3000000
      })
  }

  const createReport = async()=>{
    const {web3,contract} = web3Api;


    await contract.createReport("0x3f88e2e97FCDEAfBa12b64e2696d5A048EAD65Bc","he is good","111",{
      from:account,
      gas: 3000000
    })
  }

  const refund = async()=>{
    const {web3,contract} = web3Api;

    await contract.refund({
      from : account,
      gas: 3000000
    })

    
  }

  

  const registerDoctor = async()=>{

      const {contract} = web3Api
      await contract.registerDoctor("Ashutosh Jha","male","india",1,"gg",{
        from : account
      })
  }

  const getReport = async()=>{

    const {contract} = web3Api

    await console.log(contract.getReport(account,"111",{from:account}))
  }

  // signUP();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Demo fn = {registerPatient}/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
          
          &nbsp;
          <button type="button" className="btn btn-success " onClick={appointment}>
            appointment
          </button>
          &nbsp;

          &nbsp;
          <button type="button" className="btn btn-success " onClick={refund}>
            refund
          </button>
          &nbsp;

          &nbsp;
          <button type="button" className="btn btn-success " onClick={registerDoctor}>
            registerDoctor
          </button>
          &nbsp;

          &nbsp;
          <button type="button" className="btn btn-success " onClick={getReport}>
            getReport
          </button>
          &nbsp;

          &nbsp;
          <button type="button" className="btn btn-success " onClick={createReport}>
            createReport
          </button>
          &nbsp;

          &nbsp;
          <button type="button" className="btn btn-success " onClick={getPatient_}>
            getPatient
          </button>
          &nbsp;

          &nbsp;
          <button type="button" className="btn btn-success " onClick={registerPatient}>
            registerPatient
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
