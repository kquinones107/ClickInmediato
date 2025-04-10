import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  // Access user from context
  const { user } = useContext(AuthContext); // Ensure UserContext is properly set up and imported
  // Access user from context

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
            path="/create-product"
            element={
              user?.role === "seller" ? (
                <CreateProduct />
              ) : (
                <Navigate to="/products" />
              )
            } 
            />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
