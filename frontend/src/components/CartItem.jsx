import { useState } from "react";
import { Row, Col, Button, Image, InputGroup, FormControl, Placeholder } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa"

// Component for displaying a single cart item with quantity controls and delete option
export default function CartItem({ item }) {
  const { deleteItem, handleQuantityChange } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Row className="align-items-center m-1 mb-3 pt-3 pb-3 shadow-sm rounded">

      {/* Product image with placeholder until loaded */}
      <Col md={4} className="d-flex align-items-center">

        {!imgLoaded && (
          <Placeholder as="div" animation="glow" style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }} className="img-thumbnail" >
            <Placeholder xs={12} style={{ width: "100%", height: "100%" }} />
          </Placeholder>
        )}

        <Image
          src={item.image}
          alt={item.name}
          thumbnail
          style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px", display: imgLoaded ? "initial" : "none" }}
          onLoad={() => setImgLoaded(true)}
        />
        <span>{item.name}</span>
      </Col>

      {/* Item price */}
      <Col md={2}>₹{item.price}</Col>

      {/* Quantity controls */}
      <Col md={2}>
        <InputGroup size="sm" style={{ width: 100, justifySelf: 'center' }}>
          <Button
            variant="outline-dark"
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <FormControl
            value={item.quantity}
            readOnly
            className="text-center"
          />
          <Button
            variant="outline-dark"
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </InputGroup>
      </Col>

      {/* Total price for this item */}
      <Col md={3} style={{ textAlign: "center" }}>₹{item.price * item.quantity}</Col>

      {/* Delete item button */}
      <Col md={1}>
        <Button
          variant="outline-danger"
          onClick={() => deleteItem(item.id)}
          style={{ float: "right" }}
        >
          <FaTrash />
        </Button>
      </Col>
    </Row>
  );
}
