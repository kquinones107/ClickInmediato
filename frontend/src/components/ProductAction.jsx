import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";

const ProductAction = ({ product, sellerId }) => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${product._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Producto eliminado con éxito.");
                window.location.reload(); // Reload the page to see the changes
            } catch (err) {
                console.error("Error deleting product:", err);
                alert("Error al eliminar el producto. Por favor, inténtalo de nuevo.");
            }
        }
    };

    if (!user || user.id !== sellerId) return null; // Only show actions if the user is the seller
    
    return (
        <div className="flex justify-between mt-4">
            <button
                className="text-yellow-500 hover:text-yellow-600"
                onClick={() => navigate(`/edit-product/${product._id}`)}
                title="Editar"
            >
                <Pencil className="w-4 h-4" />
            </button>
            <button
                className="text-red-500 hover:text-red-600"
                onClick={handleDelete}
                title="Eliminar"
            >
                <Trash className="w-4 h-4" />
            </button>
        </div>
    );

};

export default ProductAction;