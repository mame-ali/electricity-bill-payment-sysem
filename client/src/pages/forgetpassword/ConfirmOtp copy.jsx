import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import React, { useContext,useState } from 'react';
import axios from '../../utility/axios';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';
const ConfirmOtpSecond = () => {

  const [otp, setOtp] = useState('');
  const location = useLocation();
 const navigate3 = useNavigate();
  // Access the email from the location state
  const { email } = location.state || {};

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    user_email: email,
    otp: otp
  };

  try {
    const response = await axios.post('users/confirmotpSecond', formData);
    alert(response.data.msg);
    navigate3('/login'); // Pass the email to the next component
  } catch (error) {
    alert(error.response.data.msg);
    console.log(error);
  }
};


  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="mb-4">Confirm OTP</h2>
          {/* Display the email if it's available */}
          {email && (
            <p className="mb-4">Email: {email}</p>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="otp">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the OTP sent to your email/phone"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Confirm
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmOtpSecond;
