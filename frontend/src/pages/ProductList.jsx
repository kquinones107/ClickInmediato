import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">🛍️ Productos</h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {filteredProducts.map((product) => (
        <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
        >
        <img
            src={product.images[0] || "https://via.placeholder.com/300"}
            alt={product.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
            <p className="text-xs text-gray-500">Por: {product?.seller?.username || "Desconocido"}</p>
        </div>
        </div>
        ))}
        </div>
    </div>
  );
};
export default ProductList;