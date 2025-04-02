import React from "react";

const ProductItem = ({ product, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
      <p className="text-gray-600 text-sm mt-2">
        Description : {product.description}
      </p>
      <p className="text-gray-600 text-sm mt-2">
        Category : {product.category}
      </p>
      <p className="text-gray-600 text-sm mt-2">Brand : {product.brand}</p>
      <p className="text-gray-600 text-sm mt-2">Rating : {product.rating}/10</p>
      <p className="text-gray-600 text-sm mt-2">
        {product.stock} quantities available
      </p>
      <p className="text-blue-600 font-semibold mt-2">
        Price: ₹{product.price}
      </p>

      <div className="mt-4 flex place-content-end">
        <button
          onClick={() => onEdit(product)}
          className="mr-2 px-3 py-2 border border-gray-700 rounded hover:bg-slate-800 hover:text-white transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
