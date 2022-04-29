import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  SSRProvider,
} from "react-bootstrap";
import Link from "next/link";
export default function Home(props) {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <SSRProvider>
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link href="/home" passHref>
                  <Nav.Link>Home</Nav.Link>
                </Link>
                <Link href="/prod" passHref>
                  <Nav.Link>Produkter</Nav.Link>
                </Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="/user/logout">
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/">login</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/user/createUser">
                    createUser
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </SSRProvider>
      </Navbar>
      <main>{props.children}</main>
    </div>
  );
}
