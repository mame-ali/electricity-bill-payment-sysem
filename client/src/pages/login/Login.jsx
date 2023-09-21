import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utility/axios";
import { UserContext } from "../../context/UserContext";
import "./login.css";

function Login() {
	const [userData, setUserData] = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate3 = useNavigate();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const validateEmail = (email) => {
		// Regular expression for a valid email format
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegex.test(email);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		// Validate email and password
		if (!validateEmail(email)) {
			// Handle invalid email format
			alert("Invalid email format");
			return;
		}

		let formData = {
			email: email,
			password: password,
		};

		try {
			const response = await axios.post("/users/login", formData);
			console.log(response)
			alert(response.data.msg);
			setUserData({
				token: response.data.token,
				user: response.data.user,
			});

			navigate3("/");
		} catch (error) {
			alert(error.response.data.msg);
			console.log(error);
		}
	};

	return (
		<Container className="large_container">
			<Row className="custom-transparent-bg justify-content-center mt-5">
				<Col md={6}>
					<h2 className="mb-4">Login</h2>
					<Form onSubmit={handleLogin} className="custom-form">
						<Form.Group controlId="email">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={handleEmailChange}
								required
							/>
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
								required
							/>
						</Form.Group>

						<Button
							className="mt-3"
							variant="primary"
							type="submit"
							style={{ backgroundColor: "#3D38B8" }}
						>
							Login
						</Button>
						<br />
						<div className="d-flex justify-content-between">
							<Link
								to="/forgetpassword"
								style={{
									textDecoration: "none",
									fontSize: "16px",
									color: "#F7D73A",
									marginTop: "10px",
									display: "block",
									fontWeight: "bold",
									textTransform: "uppercase",
								}}
							>
								Forget Password
							</Link>

							<Link
								className="text-white"
								to="/signup"
								style={{
									textDecoration: "none",
									fontSize: "16px",
									marginTop: "10px",
									display: "block",
								}}
							>
								Create an account
							</Link>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
