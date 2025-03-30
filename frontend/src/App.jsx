import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import './App.css'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/products">Products</Link> |{' '}
        <Link to="/create-product">Create Product</Link> | {' '}
        <Link to="/login">Login</Link> | {' '}
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App
