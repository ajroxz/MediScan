// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract MediScan{

    mapping(address=>bool) docOrPat;

    string[]  x;

    struct repoAndDate{

        string date;

        string repo;

    }

    struct Patients {

        string name;
        uint age;
        string bloodGroup;
        string Gender;
        string Country;

    }

    mapping(address=>Patients) addToPat;

    repoAndDate temp;

    mapping(address=>repoAndDate[]) patRep;

    mapping(address=>uint) docFee;

    string report;

    string date;

    modifier isDoctor() {
        require(docOrPat[msg.sender], "Only a Doctor can add report");
        _;
    }

    function signUp(address _user,uint _fee) public {

        docOrPat[_user] = true;

        docFee[_user] = _fee;
    }


    function register(string memory _name,uint age,string memory _bloodGp,string memory _gender,string memory _country) public {

        addToPat[msg.sender] = Patients(_name,age,_bloodGp,_gender,_country);

    }

    receive() external payable{}


    function checkBal() public view returns(uint){

        return address(this).balance;
    }

    function createReport(address _patient,string memory _report, string memory _date) public isDoctor {


        temp.date = _date;

        temp.repo = _report;

        patRep[_patient].push(temp);

        payable(msg.sender).transfer(docFee[msg.sender]*1000000000000000000);

        // payable(_patient).transfer((address(this).balance-docFee[msg.sender])*1000000000000000000);

        
        
    }

    function refund() public {

        payable(msg.sender).transfer(address(this).balance*1000000000000000000);

    }

    function getReport(address _patient,string memory _date) public view returns(string memory) {

        for(uint i = 0;i<patRep[_patient].length;i++)
        {
            if(keccak256(bytes(_date)) == keccak256(bytes(patRep[_patient][i].date)))
            {
                return patRep[_patient][i].repo;
            }
        }

        return "no record found";


        
    }
    

   function history(address _patient) public returns(string[] memory){

       

       for(uint i =0;i<patRep[_patient].length;i++)
       {
           x.push(patRep[_patient][i].repo);
       }

       return x;

   }



}
