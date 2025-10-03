import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-3">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Knovator Ecommerce
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" onClick={() => navigate("/cart")}>
            Cart 
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
