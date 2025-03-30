import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App
