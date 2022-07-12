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



function Hello() {
  
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

  async function registerPatient (Name,Age,BloodGroup,Gender,Country){
    const {web3,contract} = web3Api;
    console.log(Name)
    await contract.registerPatient(Name,Age,BloodGroup,Gender,Country,
      {
        from:account,
        gas:3000000
      })
  } 

  let [data, setData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    gender: "",
    country: "",
  });

  const handleChange = (e) => {
    data[e.target.id] = e.target.value
    setData({...data, [e.target.id]:e.target.value})
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    registerPatient(data.name,data.age,data.bloodGroup,data.gender,data.country)
    console.log(data);
  };
  
  return (
    <div>
    <NavBar/>
    <div className="flex justify-center">
      <form className="flex flex-col bg-white p-8 m-20 w-96 shadow-xl rounded form-data" >
      <p className="h-2 my-5 text-center uppercase font-semibold text-cyan-500 shadow-lg">Register Patient</p>
      <label id="name" className="text-xs text-gray-600 px1 py1">Name</label>
      <input required type="text" placeholder="Enter Name" onChange={handleChange} id="name" value ={data.name} className="input-field mb-2 px3 py3 rounded outline-none border"/>
      <label id="name" className="text-xs text-gray-600 px1 py1">Age</label>
      <input required type="number" placeholder="Enter Age" onChange={handleChange} id="age" value ={data.age} className="mb-2 px3 py3 rounded outline-none border"/>
      <label id="name" className="text-xs text-gray-600 px1 py1">Blood Group</label>
      <input required type="text" placeholder="Enter Blood Group" onChange={handleChange} id="bloodGroup" value ={data.bloodGroup} className="mb-2 px3 py3 rounded outline-none border"/>
      <label id="name" className="text-xs text-gray-600 px1 py1">Gender</label>
      <input required type="text" placeholder="Enter Gender" onChange={handleChange} id="gender"  value ={data.gender} className="mb-2 px3 py3 rounded outline-none border"/>
      <label id="name" className="text-xs text-gray-600 px1 py1">Country</label>
      <input required type="text" placeholder="Enter Country" onChange={handleChange} id="country" value ={data.country} className="mb-2 px3 py3 rounded outline-none border"/>
      <input required type="submit" onClick={handleSubmit} className="rounded shadow-xl bg-cyan-300 px-6 py3 hover:bg-cyan-400 cursor-pointer my-2 border border-cyan-300 transition-all duration-300 text-white uppercase"/>
      <h5 className="text-m text-gray-600 px1 py1" >Are you doctor?  <Link to="/doctor">click Here!</Link></h5>
      </form>
    </div>
    <Footer/>
    </div>
  );
}

export default Hello;
