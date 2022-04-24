import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Web3 from "web3";
// import detectEthereumProvider from "@metamask/detect-provider";
// import { loadContract } from "./utils/load-contract";

function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      let provider = null;
      if (window.ethereum) {
        provider = window.ethereum;
        try {
          await provider.enable();
        } catch {
          console.error("User is not allowed");
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else if (!process.env.production) {
        provider = new Web3.providers.HttpProvider("http://localhost:7545");
      }

      setWeb3Api({
        web3: new Web3(provider),
        provider,
      })
    };

    loadProvider();
  }, []);

  console.log(web3Api.web3)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
