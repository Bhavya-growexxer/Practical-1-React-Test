import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleOpenModal = (product = null) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Product List</h2>

      <div className="text-right mb-4">
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 border border-black rounded hover:bg-slate-900 hover:text-white transition"
        >
          + Add Product
        </button>
      </div>

      <ProductList onEditProduct={handleOpenModal} />

      <ProductForm
        open={isModalOpen}
        handleClose={handleCloseModal}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default App;
