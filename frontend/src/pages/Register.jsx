import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "buyer",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/users", form);
            login(res.data, res.data.token);
            navigate("/products");
            alert("User registered successfully!");
        }catch (err) {
            console.error(err);
            alert("Error registering user!");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Registro</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="buyer">Comprador</option>
              <option value="seller">Vendedor</option>
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Registrarse
            </button>
          </form>
        </div>
      );
    };

export default Register;