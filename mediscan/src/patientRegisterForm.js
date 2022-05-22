import React, { useState } from "react";
import "./App.css"

function App() {
  let [data, setData] = useState({
    name: "Varun Singh",
    age: "22",
    bloodGroup: "A+",
    gender: "M",
    country: "IND",
  });

  const handleChange = (e) => {
    data[e.target.id] = e.target.value
    setData(data)
  };

  const handleSubmit = () => {
    console.log(data);
  };
  
  return (
    <div className="flex justify-center">
      <form className="flex flex-col bg-white p-8 m-20 w-96 shadow-xl rounded form-data">
      <p className="h-2 my-5 text-center uppercase font-semibold text-cyan-500 shadow-lg">Register Patient</p>
      <label id="name" className="text-xs text-gray-600 px1 py1">Name</label>
      <input required type="text" placeholder="Enter Name" onChange={handleChange} id="c" className="input-field mb-2 px3 py3 rounded outline-none border"/>
      <label id="name" className="text-xs text-gray-600 px1 py1">Age</label>
      <input required type="number" placeholder="Enter Age" onChange={handleChange} id="age" className="mb-2 px3 py3 rounded outline-none border"/>
      <label id="name" className="text-xs text-gray-600 px1 py1">Blood Group</label>
      <input required type="text" placeholder="Enter Blood Group" onChange={handleChange} id="bloodGroup" className="mb-2 px3 py3 rounded outline-none border"/>
      <label id="name" className="text-xs text-gray-600 px1 py1">Gender</label>
      <input required type="text" placeholder="Enter Gender" onChange={handleChange} id="gender" className="mb-2 px3 py3 rounded outline-none border"/>
      <label id="name" className="text-xs text-gray-600 px1 py1">Country</label>
      <input required type="text" placeholder="Enter Country" onChange={handleChange} id="country" className="mb-2 px3 py3 rounded outline-none border"/>
      <input required type="submit" onClick={handleSubmit} className="rounded shadow-xl bg-cyan-300 px-6 py3 hover:bg-cyan-400 cursor-pointer my-2 border border-cyan-300 transition-all duration-300 text-white uppercase"/>
      </form>
    </div>
  );
}

export default App;
