import React, { useState, useEffect } from "react";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../store/apis/productApi";

const ProductForm = ({ open, handleClose, productToEdit }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    brand: "",
    rating: "",
    stock: "",
    createdAt: "",
    updatedAt: "",
  });

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      setProduct({
        title: "",
        description: "",
        category: "",
        price: "",
        brand: "",
        rating: "",
        stock: "",
        createdAt: "",
        updatedAt: "",
      });
    }
  }, [productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();

    if (productToEdit) {
      await updateProduct({ ...product, updatedAt: timestamp });
    } else {
      await addProduct({
        ...product,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }

    handleClose();
  };

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {productToEdit ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Brand</label>
            <input
              type="text"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Rating</label>
            <input
              type="number"
              value={product.rating}
              onChange={(e) => {
                let value = Number(e.target.value);

                if (value > 10) {
                  alert("Rating cannot be more than 10!");
                  return;
                }
                if (value < 0) {
                  alert("Rating cannot be less than 0!");
                  return;
                }

                setProduct({ ...product, rating: value });
              }}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {productToEdit ? "Update" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ProductForm;
