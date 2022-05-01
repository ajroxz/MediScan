// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract MediScan{

    struct Patient {

        string name;
        uint age;
        string bloodGroup;
        string Gender;
        string Country;

    }

    struct Doctor {

        string name;
        string Gender;
        string Country;
        uint fee;
        string _type;
    }

    struct Report{

        string date;

        string report;

    }

    mapping(address=>Patient) Patients;

    mapping(address=>Doctor) Doctors;

    mapping(address=>bool)docOrPat;

    mapping(address=>Report[]) Reports;

    mapping(address=>uint) trans;

    receive() external payable{}

    modifier isDoctor() {
        require(docOrPat[msg.sender], "Only a Doctor can add report");
        _;
    }

    modifier paid(){

        require(trans[msg.sender]>0,"you haven't paid ether");
        _;
    }

    function signUp(string memory _name,string memory _gender,string memory _country,uint _fee,string memory _type) public {

        docOrPat[msg.sender] = true;

        Doctors[msg.sender] = Doctor(_name,_gender,_country,_fee,_type);

    }

    // make it like those who paid can only take refund if doctor not available or any reason.
    function refund() external paid{

        payable(msg.sender).transfer(trans[msg.sender]);

    }

    function checkBal() public view returns(uint){

        return address(this).balance;
    }

    //appointment

    function appointment() public payable{

        //search doctor
        //pay ether and get appointment with date and time.

        trans[msg.sender] += msg.value;

    }

    function registerDoctor(string memory _name,string memory _gender,string memory _country,uint _fee,string memory _type) public
    {
        Doctors[msg.sender] = Doctor(_name,_gender,_country,_fee,_type);
        docOrPat[msg.sender] = true;
    }

    //register hospital

    // get report from history of patient record

    function registerPatient(string memory _name,uint age,string memory _bloodGp,string memory _gender,string memory _country) public {

        Patients[msg.sender] = Patient(_name,age,_bloodGp,_gender,_country);

    }

    modifier check(address _patient){
        require(trans[_patient]>=Doctors[msg.sender].fee,"ether is not paid according to fees");
        _;
    }

    function createReport(address _patient,string memory _report, string memory _date) public isDoctor check(_patient){


        Reports[_patient].push(Report(_date,_report));

        payable(msg.sender).transfer((Doctors[msg.sender].fee));

        // payable(_patient).transfer((address(this).balance-docFee[msg.sender])*1000000000000000000);

        
    }

    function getReport(address _patient,string memory _date) public view returns(string memory) {

        for(uint i = 0;i<Reports[_patient].length;i++)
        {
            if(keccak256(bytes(_date)) == keccak256(bytes(Reports[_patient][i].date)))
            {
                return Reports[_patient][i].report;
            }
        }

        return "no record found";


        
    }


    string[] x;

    function history(address _patient) public returns(string[] memory){

       

       for(uint i =0;i<Reports[_patient].length;i++)
       {
           x.push(Reports[_patient][i].report);
       }

       return x;

   }



}
