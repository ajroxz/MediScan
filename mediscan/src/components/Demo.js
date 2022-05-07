import React, { Component, useState } from "react";
import  ReactDOM  from "react-dom";
import './demo.css';



const Demo = (props)=>{

    const [userRegistration,setUserRegistration] = useState({
        Name:"",
        Age:"",
        BloodGroup:"",
        Gender:"",
        Country:""

    });

    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        

        setUserRegistration({...userRegistration,[name]:value});

        console.log(userRegistration)
    }

    const [records,setRecords] = useState([])

    const handleSubmit = (e)=>{
        e.preventDefault();
    
        const newRecord = {...userRegistration,id:new Date().getTime().toString()}
    
        // console.log(records);

        console.log(newRecord)
    
        setRecords([...records,newRecord]);
    
        console.log(records);


        setUserRegistration({Name:"",Age:"",BloodGroup:"",Gender:"",Country:""})
    }

   
                return <>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Name">Name</label>
                        <input type="text"  autoComplete="off" 
                        value={userRegistration.Name} onChange={handleInput} name="Name" id="Name"/>
                    </div>
                    <div>
                        <label htmlFor="Age">Age</label>
                        <input type="text" autoComplete="off" 
                        value={userRegistration.Age} onChange={handleInput} name="Age" id="Age"/>
                    </div>
                    <div>
                        <label htmlFor="BloodGroup">Blood Group</label>
                        <input type="text" autoComplete="off" 
                        value={userRegistration.BloodGroup} onChange={handleInput} name="BloodGroup" id="BloodGroup"/>
                    </div>
                    <div>
                        <label htmlFor="Gender">Gender</label>
                        <input type="text" autoComplete="off" 
                        value={userRegistration.Gender} onChange={handleInput} name="Gender" id="Gender"/>
                    </div>
                    <div>
                        <label htmlFor="Country">Country</label>
                        <input type="text" autoComplete="off" 
                        value={userRegistration.Country} onChange={handleInput} name="Country" id="Country"/>
                    </div>
                    <button type="submit">Registration</button>
                </form>
                </>
                
     

}

// class Demo extends Component {

//     render(){
//         return <div className="main">
//             <p>hello {this.props.name}</p>
//         </div>
        
//     }
// }

export default Demo;