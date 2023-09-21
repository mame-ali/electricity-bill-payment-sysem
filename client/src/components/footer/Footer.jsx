import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";
import youtubeIcon from "../../assets/images/youtube-icon-cropped.jpg";
const Footer = () => {
	return (
		<footer className="mt-5">
			<Container>
				<Row>
					<Col md={6}>
						<h5>About Us</h5>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
							turpis at leo ullamcorper ullamcorper.
						</p>
					</Col>
					<Col md={3}>
						<h5>Links</h5>
						<ul className="list-unstyled">
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/about">About</a>
							</li>

							<li>
								<Link to="/services">Services</Link>
							</li>
							<li>
								<a href="/contact">Contact</a>
							</li>
						</ul>
					</Col>
					<Col md={3}>
						<h5>Contact Us</h5>
						<p>1234 Main Street, City, Country</p>
						<p>info@example.com</p>
						<p>+1 234 567 890</p>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<p className="text-center">
							&copy; {new Date().getFullYear()} Your Company. All rights
							reserved.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
