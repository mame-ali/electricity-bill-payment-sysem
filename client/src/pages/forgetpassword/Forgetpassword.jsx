import React, { useContext,useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from '../../utility/axios';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate3 = useNavigate();
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    const formData = {
      user_email: email
    }
   try { 
       const response = await axios.post('/api/users/forgetpassword', formData);
       // console.log(response);
      alert(response.data.msg);
     // localStorage.setItem("auth-token", loginRes.data.token);
       navigate3('/confirmotp', { state: { email } });
      
    } catch (error) { 
       alert(error.response.data.msg);
      console.log(error)
    }

  };

  return (
		<Container className="custom-transparent-bg">
			<Row className=" justify-content-center " style={{ minHeight: "300px" }}>
				<Col md={6}>
					<h2 className="mt-5 text-white">Forgot Password</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="email">
							<Form.Label className="text-white">Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={handleEmailChange}
								required
							/>
						</Form.Group>

						<Button
							className="mt-3"
							variant="primary"
							type="submit"
							style={{ backgroundColor: "#3D38B8" }}
						>
							Reset Password
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default ForgetPassword;
