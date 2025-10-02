import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const dummyProducts = [
    {
        id: 1,
        name: "Classic Leather Wallet",
        description: "Compact bifold wallet made from genuine leather.",
        price: 499,
        image: "https://picsum.photos/id/0/400/300"
    },
    {
        id: 2,
        name: "Bluetooth Headphones",
        description: "Over-ear, noise-cancelling Bluetooth headphones.",
        price: 3499,
        image: "https://picsum.photos/id/1/400/300"
    },
    {
        id: 3,
        name: "Stainless Steel Water Bottle",
        description: "Keeps drinks hot or cold for 12 hours.",
        price: 799,
        image: "https://picsum.photos/id/2/400/300"
    },
    {
        id: 4,
        name: "Minimalist Watch",
        description: "Sleek watch with leather strap and quartz movement.",
        price: 2599,
        image: "https://picsum.photos/id/3/400/300"
    }
];

export default function ProductListingPage() {
   return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center fw-bold">Products</h2>
      <Row>
        {dummyProducts.map((product) => (
          <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}