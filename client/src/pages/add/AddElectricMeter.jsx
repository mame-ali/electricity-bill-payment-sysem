import axios from '../../utility/axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
const AddElectricMeter = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [region, setRegion] = useState('');
  const [zone, setZone] = useState('');
  const [wereda, setWereda] = useState('');
  const [subcity, setSubcity] = useState('');
  const [kebele, setKebele] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [users2, setUser2] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
  const fetchdata = async () =>  {
    try {
      const response = await axios.get("users/users");
        // console.log(response.data.results)
      if (Array.isArray(response.data.results) && response.data.results.length > 0) {
        // Extract the user_id values from the response data
          const userIdsFromResponse = response.data.results.map(user => user.user_id);
          
        setUser2(userIdsFromResponse);
        console.log(userIdsFromResponse);
      } else {
        console.error('No user data found in the response.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchdata();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
     
      
    const electricMeterData = {
      account_number: accountNumber,
        user_id: userId,
       region,
      zone,
      wereda,
      subcity,
      kebele,
      house_number: houseNumber,
    };

      
      try {
          const response = await axios.post("users/addelectricmeter", electricMeterData);
          alert(response.data.msg);
          navigate("/electricmeter");
      } catch (error) { 
          console.log(error)
      }
    
  };

    return (
      <div className='ps-5 pe-5 ms-5 me-5 mt-5 mb-5'>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="accountNumber">
        <Form.Label>Account Number</Form.Label>
        <Form.Control
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="userId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            as="select"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select User ID</option>
            {users2.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </Form.Control>
        </Form.Group>

      <Form.Group controlId="region">
        <Form.Label>Region</Form.Label>
        <Form.Control
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="zone">
        <Form.Label>Zone</Form.Label>
        <Form.Control
          type="text"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="wereda">
        <Form.Label>Wereda</Form.Label>
        <Form.Control
          type="text"
          value={wereda}
          onChange={(e) => setWereda(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="subcity">
        <Form.Label>Subcity</Form.Label>
        <Form.Control
          type="text"
          value={subcity}
          onChange={(e) => setSubcity(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="kebele">
        <Form.Label>Kebele</Form.Label>
        <Form.Control
          type="text"
          value={kebele}
          onChange={(e) => setKebele(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="houseNumber">
        <Form.Label>House Number</Form.Label>
        <Form.Control
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
            </Form>
            </div>
  );
};

export default AddElectricMeter;