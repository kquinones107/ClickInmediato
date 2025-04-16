import React from "react";

const ProductFilters = ({
  searchTerm,
  categoryFilter,
  minPrice,
  maxPrice,
  setSearchTerm,
  setCategoryFilter,
  setMinPrice,
  setMaxPrice,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <input
        type="text"
        placeholder="🔍 Buscar productos..."
        className="p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoría..."
        className="p-2 border rounded"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio mínimo"
        className="p-2 border rounded"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio máximo"
        className="p-2 border rounded"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>
  );
};

export default ProductFilters;
