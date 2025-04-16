import { useState, useContext } from "react";
import axios from "axios";  
import { AuthContext } from "../context/AuthContext";

const CreateProduct = () => {
    const { token } = useContext(AuthContext);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        images: "",
        category: "",
        stock: "",
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
            const productData = {
                ...form,
                images: form.images.split(",").map((img) => img.trim()),
                price: parseFloat(form.price),
                stock: parseInt(form.stock),
            };

            const res = await axios.post("http://localhost:5000/api/products", productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
            alert("Product created successfully!");
            console.log(res.data);
            }catch (err) {
                console.error("Error:", err.response?.data || err.message);
                alert("❌ Error creando producto:\n" + JSON.stringify(err.response?.data || err.message, null, 2));
              }
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Crear Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Título</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Descripción</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Precio</label>
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Categoría</label>
                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Imágenes (URLs separadas por coma)</label>
                    <input
                      type="text"
                      name="images"
                      value={form.images}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                  >
                    Crear
                  </button>
                </form>
              </div>
            </div>
          );
        };
        
export default CreateProduct;