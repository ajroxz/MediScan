
//import "./App.css"
import "./index.css"
import NavBar from "./navbar";
import Footer from "./footer";
import mediScanLogo from "./medilogo.png"
import stackUsed from "./TECH.png"


function Landing() {
    return(
        <div>
            <NavBar/>
            <br></br>
            <br></br>
            <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
            <div class="max-w-lg rounded overflow-hidden shadow-lg">
                <img  src= {mediScanLogo} alt="MediScan Logo" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">MediScan</div>
                    <p class="text-gray-700 text-base">
                    A large part of patient data are stored in central databases as a result of
various events at different facilities or via different software structures. All the
responsibility of patient data is with service provider or some type of operator
and not with the patient, which makes easy access to all data and control over the
transfer and use of personal data almost impossible for them. With the current
management of patient data, there is no guarantee of the integrity or reliability of
patient records, and the risk of data loss or data misuse is great. Now in this
revolutionary era blockchain technology we offers a promising and secure blockchain bases portal MEDISCAN to
enable and support the digital, secure and reliable integration of health
information across various applications and stakeholders.
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#BlockChain</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Solidty</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Ganache</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Mediscan</span>
                </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="flex justify-center">
            <img  src= {stackUsed} alt="MediScan Logo" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '80vh'
      }}/>
            </div>
            <br></br>
            <br></br>
            <Footer/>
        </div>
    );
}
export default Landing;