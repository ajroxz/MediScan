import logo from './logo.svg';

import './index.css';
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import Demo from './components/Demo'
import PatientForm from "./patientRegisterForm"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hello from './patientRegisterForm';
import Doctor from './DoctorRegistration';



function App() {

  return (
  
     <Router>
            <Routes>
                  <Route  path = '/' element={<Hello/>}/>  
                  <Route  path = '/Doctor' element={<Doctor/>}/>   
            </Routes>
     </Router>
  );
}

export default App;



