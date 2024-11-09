/* eslint-disable react/prop-types */

function ManufacturerForm({
  handleAddUidScanner,
  addproductId,
  productTypeRef,
  manufactureDateRef,
  quantityProducedRef,
  addProductDetails,
}) {
  return (
    <div className="w-1/4 flex flex-col p-2 m-2 shadow-lg rounded-lg gap-4 items-center ">
      <div className="font-bold text-3xl text-green-800">Manufacturer Form</div>
      <input
        className="p-1 mt-2 rounded-sm px-4 border-2 border-slate-300"
        onFocus={handleAddUidScanner}
        placeholder="Product Id"
        value={addproductId}
        readOnly
      ></input>
      <input
        className="p-1 rounded-sm px-4 border-2 border-slate-300"
        ref={productTypeRef}
        type="text"
        placeholder="Enter Product Type"
      ></input>
      <input
        className="p-1 rounded-sm px-4 border-2 border-slate-300"
        ref={manufactureDateRef}
        type="number"
        placeholder="Enter Manufacture Date"
      ></input>
      <input
        className="p-1 rounded-sm px-4 border-2 border-slate-300"
        ref={quantityProducedRef}
        type="number"
        placeholder="Quantity Produced in Kg"
      ></input>
      <button
        className="bg-green-700 hover:bg-green-900 mb-4 rounded-md text-white p-2 w-2/4"
        onClick={() => {
          addProductDetails();
        }}
      >
        Add Data
      </button>
    </div>
  );
}

export default ManufacturerForm;
