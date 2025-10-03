import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import Swal from "sweetalert2";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

// Page to view cart items, total price, collect user info, and place order
export default function CartPage() {
    const { state, dispatch } = useCart();
    const [user, setUser] = useState({ firstName: "", lastName: "", address: "" });
    const navigate = useNavigate();

    const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Function to Place order and handle response
    const handlePlaceOrder = async () => {
        try {
            const res = await placeOrder(user, state.cart);

            // Show success message with order ID
            Swal.fire(
                "Success",
                (res.data.message || "Order placed successfully!") + (res.data?.orderId && `<br>Order ID: #${res.data.orderId}`),
                "success"
            );

            // Clear cart after successful order
            dispatch({ type: "CLEAR_CART" });

            // Redirect to home after short delay
            setTimeout(() => {
                navigate('/')
            }, 3000)
        } catch (error) {
            // Show error message from server or generic message
            Swal.fire(
                "Error",
                error?.response?.data?.errors?.join('<br/>') ||
                error.response?.data?.message ||
                error.message ||
                "Something went wrong!",
                "error"
            );
        }
    };


    return (
        <Container className="mt-4">
            <h2 className="fw-bold">Your Cart</h2>
            {state.cart.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
            <h4 className="pt-2">Total: ₹{total}</h4>
            <hr />

            {/* User details form */}
            <h3 className="mt-4">User Details</h3>
            <Form className="m-1">
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} required />
                </Form.Group>

                <Button variant="success" onClick={handlePlaceOrder}>
                    Place Order
                </Button>
            </Form>
            <hr />

        </Container>
    );
}
