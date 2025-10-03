import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa"

// Header component with brand and cart button showing total items
export default function Header() {
  const navigate = useNavigate();
  const { state } = useCart();

  // Calculate total number of items in the cart
  let cartItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-3">
      <Container>
        {/* Brand navigates to home page */}
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Knovator Ecommerce
        </Navbar.Brand>

        {/* Cart button navigates to cart page and shows item count */}
        <Nav className="ms-auto">
          <Button
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            variant="outline-light"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart /> Cart {cartItems === 0 ? '' : `(${cartItems})`}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
