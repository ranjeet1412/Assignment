import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Collapse, 
  Navbar as ReactstrapNavbar, 
  NavbarToggler, 
  NavbarBrand, 
  Nav, 
  NavItem, 
  NavLink, 
  Button 
} from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authState, logout } = useContext(AuthContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <ReactstrapNavbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/employeelist" ><h3>Assignment</h3></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {authState.isAuthenticated ? (
              <>
                <NavItem>
                  <Button color="link" onClick={logout}>Logout</Button>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/register">Register</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </ReactstrapNavbar>
    </div>
  );
};

export default Navbar;
