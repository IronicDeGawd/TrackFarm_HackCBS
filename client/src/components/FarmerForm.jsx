/* eslint-disable react/prop-types */
// import React from 'react';

const FarmerForm = ({
  handleAddUidScanner,
  addproductId,
  cropType,
  setCropType,
  location,
  setLocation,
  fertiliser,
  setFertiliser,
  harvestDate,
  setHarvestDate,
  quantity,
  setQuantity,
  addProductDetails,
}) => {
  return (
    <div className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Farmer Form</h2>

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

      {/* Crop Type */}
      <div className="mb-4">
        <label
          htmlFor="cropType"
          className="block text-sm font-medium text-gray-700"
        >
          Crop Type
        </label>
        <input
          type="text"
          id="cropType"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Fertiliser */}
      <div className="mb-4">
        <label
          htmlFor="fertiliser"
          className="block text-sm font-medium text-gray-700"
        >
          Fertiliser
        </label>
        <input
          type="text"
          id="fertiliser"
          value={fertiliser}
          onChange={(e) => setFertiliser(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Harvest Date */}
      <div className="mb-4">
        <label
          htmlFor="harvestDate"
          className="block text-sm font-medium text-gray-700"
        >
          Harvest Date
        </label>
        <input
          type="number"
          id="harvestDate"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
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

export default FarmerForm;
