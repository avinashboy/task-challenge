import React, { useContext, useState, useEffect } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Short } from "../context";

function NavHeader() {
  const { data, setData } = useContext(Short);
  const [state, setState] = useState({ authToken: data.authToken });

  const clearToken = () => {
    localStorage.clear();
    setState({ authToken: null });
    setData({ ...data, authToken: null });
  };

  useEffect(() => {
    setState({ authToken: data.authToken });
  }, [data.authToken]);
  return (
    <Navbar collapseOnSelect bg="light" expand="lg" >
      <Container fluid>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand style={{ fontSize: "1.6rem" }} as="span" className="text-primary">
            Short URL
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        {state.authToken ? (
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ fontSize: "1.2rem" }}
            ></Nav>
            <Nav>
              <Dropdown className="px-5">
                <Dropdown.Toggle id="dropdown-basic">Setting</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <Dropdown.Item as="div">Profile</Dropdown.Item>
                  </Link>

                  <Dropdown.Item onClick={clearToken}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ fontSize: "1.2rem" }}
            >
              <Link to="/login " className="no_link">
                <Nav.Link as="span" >Login</Nav.Link>
              </Link>
              <Link to="/register" className="no_link">
                <Nav.Link as="span">Register</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavHeader;
