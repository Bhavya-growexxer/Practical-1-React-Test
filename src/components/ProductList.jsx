import React, { useState, useCallback } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../store/apis/productApi";
import ProductItem from "./ProductItem";

const ProductList = ({ onEditProduct }) => {
  const { data: products = [], error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [page, setPage] = useState(0);
  const rows = 9;

  const handleChangePage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      await deleteProduct(id);
    },
    [deleteProduct]
  );

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-600">Error loading products</div>
    );

  return (
    <div className="mt-6 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.slice(page * rows, page * rows + rows).map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onEdit={onEditProduct}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300 transition"
          >
            Prev
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={(page + 1) * rows >= products.length}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductList);
