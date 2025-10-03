import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import Swal from "sweetalert2";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const { state, dispatch } = useCart();
    const [user, setUser] = useState({ firstName: "", lastName: "", address: "" });
    const navigate = useNavigate();

    const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        try {
            const res = await placeOrder(user, state.cart);
            Swal.fire("Success", (res.data.message || "Order placed successfully!") + (res.data?.orderId && `<br>Order ID: #${res.data.orderId}`), "success");
            dispatch({ type: "CLEAR_CART" });
            setTimeout(() => {
                navigate('/')
            }, 3000)
        } catch (error) {
            Swal.fire("Error", error?.response?.data?.errors?.join('<br/>') || error.response?.data?.message || error.message || "Something went wrong!", "error");
        }
    };


    return (
        <Container className="mt-4">
            <h2>Your Cart</h2>
            {state.cart.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
            <h4>Total: ₹{total}</h4>
            <hr />

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
