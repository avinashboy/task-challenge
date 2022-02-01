import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router,Routes as Switch , Route, Link } from "react-router-dom";
import Login from "../signin/Login";
import Register from "../signup/Register";
import Wrapper from "../wrapper/Wrapper";

function NavBar() {
  return (
    <div>
        <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Money Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/"><Nav.Link href="#link">Home</Nav.Link></Link>
              <Link to="login"><Nav.Link href="#link">Login</Nav.Link></Link>
              <Link to="register"><Nav.Link href="#link">Register</Nav.Link></Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path='/' element={<Wrapper/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Switch>
      </Router>
    </div>
  );
}

export default NavBar;
