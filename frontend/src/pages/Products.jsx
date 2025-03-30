import { useState, useEffect } from 'react';
import { getProducts } from '../api/product';

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
          .then(data => setProducts(data))
          .catch(err => console.error("Error al obtener productos:", err));
      }, []);

      return (
        <div>
            <h2>🛍️ Productos</h2>
            {products.length === 0 && <p>No hay productos disponibles.</p>}
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <strong>Precio: ${p.price}</strong>
                        <br />
                        <small>Por: {p.seller?.username}</small>
                    </li>
                ))}
            </ul>
        </div>
      );
};

export default Products;