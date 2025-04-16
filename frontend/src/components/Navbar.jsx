import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => { 
    const { user, logout } = useContext(AuthContext);
    console.log("👤 Usuario en Navbar:", user); // Verifica el usuario aquí

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-700">
             ClickInmediato 
            </Link>

            <div className="flex items-center gap-4">
                <Link to="/products" className="text-gray-700 hover:text-blue-500 transition duration-300">
                    Productos
                </Link>
                {user?.role === "seller" && (
                <Link to="/create-product" className="text-gray-700 hover:text-blue-600 font-medium">
                    Crear Producto
                </Link>
                )}
                {!user ? (
                <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                    Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                    Registro
                </Link>
                 </>
                ) : (
                <>
                <span className="text-sm text-gray-600">👋 {user.username}</span>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                    Logout
                </button>
                </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;