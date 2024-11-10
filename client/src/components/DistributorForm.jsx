/* eslint-disable react/prop-types */

const DistributorForm = ({
  handleAddUidScanner,
  addproductId,
  destination,
  setDestination,
  dispatchDate,
  setDispatchDate,
  quantityDispatched,
  setQuantityDispatched,
  addProductDetails,
}) => {
  return (
    <div className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Distributor Form</h2>

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

      {/* Destination */}
      <div className="mb-4">
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-gray-700"
        >
          Destination
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Dispatch Date */}
      <div className="mb-4">
        <label
          htmlFor="dispatchDate"
          className="block text-sm font-medium text-gray-700"
        >
          Dispatch Date
        </label>
        <input
          type="number"
          id="dispatchDate"
          value={dispatchDate}
          onChange={(e) => setDispatchDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Quantity Dispatched */}
      <div className="mb-4">
        <label
          htmlFor="quantityDispatched"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity Dispatched (Kg)
        </label>
        <input
          type="number"
          id="quantityDispatched"
          value={quantityDispatched}
          onChange={(e) => setQuantityDispatched(e.target.value)}
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

export default DistributorForm;
