import { Card, Button, Badge } from "react-bootstrap"
import { FaCartPlus } from "react-icons/fa"

export default function ProductCard({ product }) {
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
                    <Button variant="primary" size="sm" className="d-flex align-items-center">
                        <FaCartPlus className="me-2" /> Add to Cart
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}