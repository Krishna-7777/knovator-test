import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListingPage from "./pages/ProductListingPage";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header";
import {CartProvider} from "./context/CartContext";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
