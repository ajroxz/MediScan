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
import CreateReport from './createReport';
import Appointment from './appointment';
import GetReport from './getReport';



function App() {

  return (
  
     <Router>
            <Routes>
                  <Route  path = '/' element={<Hello/>}/>  
                  <Route  path = '/Doctor' element={<Doctor/>}/>  
                  <Route path = '/createreport' element={<CreateReport/>}/>
                  <Route path = '/appointment' element={<Appointment/>}/>
                  <Route path = '/getreport' element={<GetReport/>}/>

            </Routes>
     </Router>
  );
}

export default App;



