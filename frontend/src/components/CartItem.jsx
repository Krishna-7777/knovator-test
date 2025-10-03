import React from "react";
import { Row, Col, Button, Image, InputGroup, FormControl } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa"


export default function CartItem({ item }) {
  const { deleteItem, handleQuantityChange } = useCart();

  return (
    <Row className="align-items-center m-1 mb-3 pt-3 pb-3 border rounded ">

      <Col md={4} className="d-flex align-items-center">
        <Image
          src={item.image}
          alt={item.name}
          thumbnail
          style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
        />
        <span>{item.name}</span>
      </Col>

      <Col md={2}>₹{item.price}</Col>

      <Col md={2}>
        <InputGroup>
          <Button
            variant="outline-secondary"
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
            variant="outline-secondary"
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </InputGroup>
      </Col>

      <Col md={3} style={{textAlign:"center"}}
      >₹{item.price * item.quantity}</Col>

      <Col md={1}>
        <Button
          variant="outline-danger"
          onClick={() => deleteItem(item.id)}
          style={{float:"right"}}
        >
          <FaTrash />
        </Button>
      </Col>
    </Row>
  );
}
