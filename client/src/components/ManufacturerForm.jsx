/* eslint-disable react/prop-types */

const ManufacturerForm = ({
  handleAddUidScanner,
  addproductId,
  productType,
  setProductType,
  manufactureDate,
  setManufactureDate,
  quantityProduced,
  setQuantityProduced,
  addProductDetails,
}) => {
  return (
    <div className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manufacturer Form</h2>

      {/* UID Scanner */}
      <div className="mb-4">
        <button
          onClick={handleAddUidScanner}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
        >
          Scan Product UID
        </button>
        <p className="mt-2 text-sm text-gray-600">Product ID: {addproductId}</p>
      </div>

      {/* Product Type */}
      <div className="mb-4">
        <label
          htmlFor="productType"
          className="block text-sm font-medium text-gray-700"
        >
          Product Type
        </label>
        <input
          type="text"
          id="productType"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Manufacture Date */}
      <div className="mb-4">
        <label
          htmlFor="manufactureDate"
          className="block text-sm font-medium text-gray-700"
        >
          Manufacture Date
        </label>
        <input
          type="number"
          id="manufactureDate"
          value={manufactureDate}
          onChange={(e) => setManufactureDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Quantity Produced */}
      <div className="mb-4">
        <label
          htmlFor="quantityProduced"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity Produced (Kg)
        </label>
        <input
          type="number"
          id="quantityProduced"
          value={quantityProduced}
          onChange={(e) => setQuantityProduced(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Submit Button */}
      <div className="mb-4">
        <button
          onClick={addProductDetails}
          className="bg-green-700 hover:bg-green-900 text-white p-2 rounded w-full"
        >
          Add Product Details
        </button>
      </div>
    </div>
  );
};

export default ManufacturerForm;
