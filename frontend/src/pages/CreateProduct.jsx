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
        <div className="create-product-container">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Product Name"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="images"
                    placeholder="Images (comma separated)"
                    value={form.images}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleChange}
                />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );

};

export default CreateProduct;