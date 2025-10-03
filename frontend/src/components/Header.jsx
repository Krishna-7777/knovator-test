import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const { state } = useCart();
  let cartItems = state.cart.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-3">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Knovator Ecommerce
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" onClick={() => navigate("/cart")}>
            Cart {cartItems==0?'':`(${cartItems})`}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
