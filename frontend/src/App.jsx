import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListingPage from "./pages/ProductListingPage";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
