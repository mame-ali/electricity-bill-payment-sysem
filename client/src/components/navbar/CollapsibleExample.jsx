import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from "../../context/UserContext";


function NavScrollExample() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  
  const handlelogout = () => { 
    setUserData(userData.token =null);
    navigate('/login');
    // console.log(userData.token)
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link to="/" className="navbar-brand">Electric Billing System</Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/news" className="nav-link">News</Link>
            <Link to="/bill" className="nav-link">Bill</Link>
            <Link to="/bill-history" className="nav-link">Bill History</Link>
          </Nav>
           <Link to="/electricmeter" className="nav-link me-5">Electric Meter</Link>
            <Link to="/users" className="nav-link me-5">Users</Link>
          <div className='pe-5'>
            
            {userData.user && <NavDropdown title={<PersonIcon />} id="navbarScrollingDropdown" className='pe-5'>
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/settings" onClick={handlelogout}>Logout</NavDropdown.Item>
            </NavDropdown>}
            {!userData.user && <Link to="/login" className="nav-link">Signin</Link>}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
