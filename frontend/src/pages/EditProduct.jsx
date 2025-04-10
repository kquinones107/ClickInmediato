import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const { title, description, price, images, category, stock } = res.data;
        setForm({
          title,
          description,
          price,
          images: images.join(", "),
          category,
          stock,
        });
      } catch (err) {
        console.error("❌ Error al obtener el producto", err); // 👈 Agregado
        alert("❌ Error al cargar el producto");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        ...form,
        images: form.images.split(",").map((img) => img.trim()),
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      };

      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Producto actualizado correctamente");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("❌ Error al actualizar el producto");
    }
  };

  return (
    <div>
      <h1>Editar Producto</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
        />
        <input
          name="images"
          value={form.images}
          onChange={handleChange}
          placeholder="URLs de imágenes separadas por coma"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Categoría"
        />
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
        />
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default EditProduct;
