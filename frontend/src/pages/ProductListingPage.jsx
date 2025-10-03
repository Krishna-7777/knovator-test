import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const limit = 9;
  let offset = 0;
  let hasMore = true;

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError("");

    try {
      const res = await getProducts(limit, offset);
      const newProducts = res.data || [];

      setProducts((prev) => [...prev, ...newProducts]);
      hasMore = (res.data.length != 0);
      offset += limit
    } catch (err) {
      console.error(err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 50 > document.body.scrollHeight
        && !loading && hasMore
      ) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <h2 className="mb-4 text-center fw-bold">Products</h2>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {loading && (
        <div className="d-flex justify-content-center align-items-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

    </Container>
  );
}