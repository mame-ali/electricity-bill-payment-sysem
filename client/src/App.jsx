import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import backgroundImg from "./resources/image/login-page-wallpapers.jpg";

//pages
//pages 
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Bill from './pages/bill/Bill';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import Four04 from './pages/404/404';
import Forgetpassword from './pages/forgetpassword/Forgetpassword';
import ConfirmOtp from './pages/forgetpassword/ConfirmOtp';
import ConfirmOtpSecond  from './pages/forgetpassword/ConfirmOtp copy';
import Enterpassword from './pages/forgetpassword/Enterpassword';

import Electric from './pages/electric/Electric';
//componnet
import NavScrollExample from "./components/navbar/CollapsibleExample";
import "./App.css";


import Users from './pages/users/Users';
import AddElectricMeter from './pages/add/AddElectricMeter';
import Read from './pages/read/Read';
import Footer from "./components/footer/Footer";
import Services from "./components/services/ServicesList";

function App() {
	const [count, setCount] = useState(0);
	const appStyle = {
		backgroundImage: `url(${backgroundImg})`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		minHeight: "700px",
	};

  return (
    <div style={appStyle}> 
      < NavScrollExample />
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgetpassword' element={<Forgetpassword />} />
        
          <Route path='/confirmotpsecond' element={<ConfirmOtpSecond />} />
        <Route path='/confirmotp' element={<ConfirmOtp  />} />
        <Route path='/enterpassword' element={<Enterpassword />} />
        <Route path='/electricmeter' element={<Electric />} />
        <Route path='/users' element={<Users />} />
        <Route path='/bills' element={<Bill />} />
        <Route path='/addelectricmeter' element={<><AddElectricMeter /></>} />
        <Route path='/read' element={ <Read />} />
   
   
        <Route path='/*'  element={<Four04 />}/>
      </Routes>
      <Footer />
		</div>
  )
}

export default App;
