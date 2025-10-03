import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

// Page to list products with infinite scroll
export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const limit = 9;       // Number of products per API request
  let offset = 0;        // Pagination offset
  let hasMore = true;    // Flag to check if more products are available

  // function to Fetch products from API
  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError("");

    try {
      const res = await getProducts(limit, offset);
      const newProducts = res.data || [];

      // Append new products to existing list
      setProducts((prev) => [...prev, ...newProducts]);

      // Update hasMore based on API response and increase offset for next request
      hasMore = (res.data.length != 0);
      offset += limit
    } catch (err) {
      console.error(err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Infinite scroll: load more products when user scrolls near bottom
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

      {/* Show error message if API fails */}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      <Row>
        {/* Render each product using ProductCard */}
        {products.map((product) => (
          <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* Show loading spinner when fetching products */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

    </Container>
  );
}