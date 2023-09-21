import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from '../../utility/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Enterpassword = () => {
  // Access the email from the location state
  const location = useLocation();
  const navigate3 = useNavigate();
  const { email } = location.state || {};
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({
    new_password: '',
    confirm_password: '',
  });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { new_password, confirm_password } = formData;

    // Validate password match
    if (new_password !== confirm_password) {
      setErrors({
        ...errors,
        confirm_password: 'Passwords do not match',
      });
      return;
    }

    // If validation passes, you can proceed with changing the password logic here

    // Reset the form after a successful password change or handle errors.
    setErrors({
      new_password: '',
      confirm_password: '',
    });

    const formData2 = {
      user_password: formData.new_password,
      user_email: email,
    };

    console.log(formData2);

    try {
      const response = await axios.post('users/changePassword', formData2);
      alert(response.data.msg);
      navigate3('/login');
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="mb-4">Change Password</h2>
          {email && <p className="mb-4">Email: {email}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="new_password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                required
                isInvalid={!!errors.new_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.new_password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirm_password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                isInvalid={!!errors.confirm_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirm_password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Enterpassword;
