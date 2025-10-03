import { Card, Button, Badge, InputGroup, FormControl } from "react-bootstrap";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function ProductCard({ product }) {
    const { state, handleQuantityChange, deleteItem, dispatch } = useCart();

    const cartItem = state.cart.find((item) => item.id === product.id);

    const handleAddToCart = () => {
        dispatch({ type: "ADD_TO_CART", payload: product });

        Swal.fire({
            toast: true,
            icon: 'success',
            title: `Added!\n ${product.name} has been added to your cart.`,
            animation: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    };

    return (
        <Card className="h-100 shadow-sm border-0 product-card ">
            <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-semibold">{product.name}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                    {product.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="success" className="fs-6">
                        ₹{product.price}
                    </Badge>

                    {cartItem ? (
                        <>
                            <InputGroup size="sm" style={{ width: "100px", }}>
                                <Button
                                    variant={cartItem.quantity > 1 ? "outline-dark" : "outline-danger"}
                                    size="sm"
                                    onClick={() => {
                                        if (cartItem.quantity > 1)
                                            handleQuantityChange(cartItem.id, cartItem.quantity - 1)
                                        else
                                            deleteItem(cartItem.id)
                                    }}
                                >
                                    {cartItem.quantity > 1 ? '-' : <FaTrash />}
                                </Button>
                                <FormControl
                                    value={cartItem.quantity}
                                    readOnly
                                    className="text-center"
                                />
                                <Button
                                    variant="outline-dark"
                                    size="sm"
                                    onClick={() =>
                                        handleQuantityChange(cartItem.id, cartItem.quantity + 1)
                                    }
                                >
                                    +
                                </Button>
                            </InputGroup>

                        </>
                    ) : (
                        <Button
                            variant="primary"
                            size="sm"
                            className="d-flex align-items-center"
                            onClick={handleAddToCart}
                        >
                            <FaCartPlus className="me-2" /> Add to Cart
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}