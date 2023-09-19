import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from '../../utility/axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
    confirm_password: '',
    f_name: '',
    m_name: '',
    l_name: '',
    phone: '',
  });

  const navigate3 = useNavigate();

  const [errors, setErrors] = useState({
    user_email: '',
    user_password: '',
    confirm_password: '',
    f_name: '',
    m_name: '',
    l_name: '',
    phone: '',
  });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const nameRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^(?:\+251|0)[1-9]\d{8}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formvalidation()) {
      try {
        const response = await axios.post('/api/users/createuser', formData);
        console.log(response);
        alert(response.data.msg);

        // Pass the email to the next component
        navigate3('/confirmotp', { state: { email: formData.user_email } });
      } catch (error) {
        alert(error.response.data.msg);
        console.log(error);
      }
    }
  };

  const formvalidation = () => {
    // Validate email format
    if (!emailRegex.test(formData.user_email)) {
      setErrors({
        ...errors,
        user_email: 'Invalid email format',
      });
      return;
    }

    // Validate password match
    if (formData.user_password !== formData.confirm_password) {
      setErrors({
        ...errors,
        confirm_password: 'Passwords do not match',
      });
      return;
    }

    // Validate name fields
    if (!nameRegex.test(formData.f_name)) {
      setErrors({
        ...errors,
        f_name: 'Invalid first name format',
      });
      return;
    }

    if (!nameRegex.test(formData.l_name)) {
      setErrors({
        ...errors,
        l_name: 'Invalid last name format',
      });
      return;
    }

    // Validate phone field
    if (!phoneRegex.test(formData.phone)) {
      setErrors({
        ...errors,
        phone: 'Invalid phone number format (10 digits)',
      });
      return;
    }

    // If validation passes, you can proceed with registration logic here

    // Reset the form after successful registration or handle registration errors.
    setErrors({
      user_email: '',
      user_password: '',
      confirm_password: '',
      f_name: '',
      m_name: '',
      l_name: '',
      phone: '',
    });

    return 1;
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="mb-4">Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="f_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="f_name"
                    value={formData.f_name}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.f_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.f_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="m_name">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Middle Name"
                    name="m_name"
                    value={formData.m_name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="l_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="l_name"
                    value={formData.l_name}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.l_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.l_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="user_email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.user_email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.user_email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="user_password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="user_password"
                    value={formData.user_password}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.user_password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.user_password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="confirm_password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
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
              </Col>
              <Col>
                <Button className="mt-3" variant="primary" type="submit">
                  Signup
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
