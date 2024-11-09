/* eslint-disable react/prop-types */
import { BigNumber } from "ethers";

const ProductDetails = ({
  product,
  handleGetUidScanner,
  idRef,
  getProductDetails,
  getproductId,
}) => {
  // Destructuring the product object with default empty values
  const {
    productId = "",
    farmerData = [],
    manufacturerData = [],
    distributorData = [],
  } = product || {};

  // Extracting and converting farmer data
  const cropType = farmerData[0] || "N/A";
  const location = farmerData[1] || "N/A";
  const fertiliser = farmerData[2] || "N/A";
  const harvestDate = farmerData[3]
    ? BigNumber.from(farmerData[3]).toNumber()
    : "N/A";
  const quantity = farmerData[4]
    ? BigNumber.from(farmerData[4]).toNumber()
    : "N/A";

  // Extracting and converting manufacturer data
  const productType = manufacturerData[0] || "N/A";
  const manufactureDate = manufacturerData[1]
    ? BigNumber.from(manufacturerData[1]).toNumber()
    : "N/A";
  const quantityProduced = manufacturerData[2]
    ? BigNumber.from(manufacturerData[2]).toNumber()
    : "N/A";

  // Extracting and converting distributor data
  const destination = distributorData[0] || "N/A";
  const dispatchDate = distributorData[1]
    ? BigNumber.from(distributorData[1]).toNumber()
    : "N/A";
  const quantityDispatched = distributorData[2]
    ? BigNumber.from(distributorData[2]).toNumber()
    : "N/A";

  return (
    <div className="w-2/4 flex flex-col p-2 m-2 shadow-lg rounded-lg gap-4 items-center ">
      <input
        onFocus={handleGetUidScanner}
        className="p-1 rounded-sm mt-2 px-4 border-2 border-slate-300"
        ref={idRef}
        value={getproductId}
        readOnly
        placeholder="Enter Product ID"
      ></input>
      <button
        className="bg-green-700 hover:bg-green-900 mb-4 rounded-md text-white p-2 w-2/4"
        onClick={getProductDetails}
      >
        Get Data
      </button>

      {product ? (
        <>
          <div className="w-full p-4">
            <h2 className="underline text-center">Product Details</h2>
            <p className="text-center m-4">
              <strong>Product ID:</strong> {productId}
            </p>
            <div className="grid grid-cols-3 w-full gap-4">
              <div>
                <h3 className="underline">Farmer Data</h3>
                <p>
                  <strong>Crop Type:</strong> {cropType}
                </p>
                <p>
                  <strong>Location:</strong> {location}
                </p>
                <p>
                  <strong>Fertiliser:</strong> {fertiliser}
                </p>
                <p>
                  <strong>Harvest Date:</strong> {harvestDate}
                </p>
                <p>
                  <strong>Quantity:</strong> {quantity}
                </p>
              </div>
              <div>
                <h3 className="underline">Manufacturer Data</h3>
                <p>
                  <strong>Product Type:</strong> {productType}
                </p>
                <p>
                  <strong>Manufacture Date:</strong> {manufactureDate}
                </p>
                <p>
                  <strong>Quantity Produced:</strong> {quantityProduced}
                </p>
              </div>
              <div>
                <h3 className="underline">Distributor Data</h3>
                <p>
                  <strong>Destination:</strong> {destination}
                </p>
                <p>
                  <strong>Dispatch Date:</strong> {dispatchDate}
                </p>
                <p>
                  <strong>Quantity Dispatched:</strong> {quantityDispatched}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Search Product to Show</p>
      )}
    </div>
  );
};

export default ProductDetails;
