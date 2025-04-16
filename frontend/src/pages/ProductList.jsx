import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
 

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? product.category?.toLowerCase().includes(categoryFilter.toLowerCase())
      : true;
    const matchesMin = minPrice ? parseFloat(product.price) >= parseFloat(minPrice) : true;
    const matchesMax = maxPrice ? parseFloat(product.price) <= parseFloat(maxPrice) : true;

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">🛍️ Productos</h1>

      <ProductFilter
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setSearchTerm={setSearchTerm}
        setCategoryFilter={setCategoryFilter}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {filteredProducts.map((product) => (
             <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;