import React, {useContext, useEffect, useState } from 'react';
import { UserContext } from "../../context/UserContext";
import axios from '../../utility/axios';

const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  useEffect(() => {
    console.log(userData);
  },[]);


  return (
    <div>
      Home 
    </div>
  )
}

export default Home
