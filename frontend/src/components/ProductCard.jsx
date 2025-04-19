import React from "react";
import ProductAction from "./ProductAction";

const ProductCard = ({ product }) => {
  const { title, description, price, images, seller, category } = product;

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

      <ProductAction product={product} sellerId={seller?._id} />
       <div className="mt-4 flex justify-between items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Ver Detalles
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Comprar
        </button>
        </div> 
    </div>
  );
};

export default ProductCard;