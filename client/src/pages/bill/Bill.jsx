import React, { useContext, useEffect } from 'react';
import DataTable from '../../components/dataTable/DataTable';
import Add from '../../components/add/Add'
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';
const Bill = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => { 
    console.log(userData.user.id);
  },[]);

  return (
      <div>
        
     <div className="info centercontent">
      <h1>Electric Bill  </h1>
           </div>
     {userData.user && <DataTable first={`users/bills/${userData.user.id}`} />}

    </div > 
        

  )
}

export default Bill
