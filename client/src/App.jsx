import { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css'

//pages 
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import Four04 from './pages/404/404';
import Forgetpassword from './pages/forgetpassword/Forgetpassword';
import ConfirmOtp from './pages/forgetpassword/ConfirmOtp';
import Enterpassword from './pages/forgetpassword/Enterpassword';


//componnet
import  NavScrollExample from './components/navbar/CollapsibleExample';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      < NavScrollExample />
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgetpassword' element={<Forgetpassword />} />
        <Route path='/confirmotp' element={<ConfirmOtp  />} />
          <Route path='/enterpassword' element={<Enterpassword/>} />
      
         <Route path='/*'  element={<Four04 />}/>
      </Routes>
      

    </>
  )
}

export default App
