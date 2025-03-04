// Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/dash">Control Gastos Familia H.M</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Ingresos" id="basic-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item href="/ingresos">Ingresos</NavDropdown.Item>
              <NavDropdown.Item href="#">Categorias Ingresos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Gastos" id="basic-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item href="/gastos">Gastos</NavDropdown.Item>
              <NavDropdown.Item href="#">Categorias Gastos</NavDropdown.Item>
              <NavDropdown.Item href="#">Sub Categorias Gastos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/dash">Reportes</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#signup">Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
