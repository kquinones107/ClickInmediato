import React from "react";
import ProductAction from "./ProductAction";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { title, description, price, images, seller, category } = product;
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const handleAddToCart = () => {
    addToCart(product);
    alert("✅ Producto agregado al carrito");
  }

  return (
    <div className="bg-white rounded-2xl p-4 w-full max-w-sm flex flex-col">
      <img
        src={images[0] || "https://via.placeholder.com/300"}
        alt={title}
        className="rounded-lg object-cover h-48 w-full mb-4"
      />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-lg font-bold text-blue-600 mt-2">${price}</p>
      <p className="text-sm text-gray-500">Por: {seller?.username || "Desconocido"}</p>
      <p className="text-sm text-gray-500">Categoría: {category || "Sin categoría"}</p>

      {user?.role === "buyer" && (
      <button
        onClick={() => handleAddToCart(product)}
        className="mt-4 bg-green-500 text-white text-sm py-2 px-4 rounded hover:bg-green-600"
      >
        Agregar al carrito
      </button>
      )}
      <ProductAction product={product} sellerId={seller?._id} />
       
    </div>
  );
};

export default ProductCard;