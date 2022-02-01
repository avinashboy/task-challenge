import { Container, Navbar } from "react-bootstrap";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

function NavHeader() {
  return (
    <Navbar bg='light'>
      <Container>
        <Link to='/' style={{ textDecoration: "none" }}>
          <Navbar.Brand as='span'>
            <img
              alt='logo-images'
              src={logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{" "}
            Flight Ticket
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
