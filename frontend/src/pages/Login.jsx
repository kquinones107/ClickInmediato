import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/users/login", form);
            login(res.data.token, res.data.user); // Save token in context
            alert("Login successful!");
        }catch (err) {
            console.error(err);
            alert("Error logging in!");
        }

    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
