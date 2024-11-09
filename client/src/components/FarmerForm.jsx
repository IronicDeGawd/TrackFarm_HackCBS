/* eslint-disable react/prop-types */

function FarmerForm({
  handleAddUidScanner,
  addproductId,
  cropRef,
  locRef,
  fertRef,
  dateRef,
  quantityRef,
  addProductDetails,
}) {
  return (
    <div className="w-1/4 flex flex-col p-2 m-2 shadow-lg rounded-lg gap-4 items-center ">
      <div className="font-bold text-3xl text-green-800">Farmer Form</div>
      <input
        className="p-1 mt-2 rounded-sm px-4 border-2 border-slate-300"
        onFocus={handleAddUidScanner}
        placeholder="Product Id"
        value={addproductId}
        readOnly
      ></input>
      <input
        className="p-1 rounded-sm px-4 border-2 border-slate-300"
        ref={cropRef}
        type="text"
        placeholder="Enter Croptype"
      ></input>
      <input
        className="p-1 rounded-sm px-4 border-2 border-slate-300"
        ref={locRef}
        type="text"
        placeholder="Enter Location"
      ></input>
      <input
        className="p-1 rounded-sm px-4 border-2 border-slate-300"
        ref={fertRef}
        type="text"
        placeholder="Enter Fertiliser"
      ></input>
      <input
        className="p-1 rounded-sm px-4 border-2 border-slate-300"
        ref={dateRef}
        type="number"
        placeholder="Enter HarvestDate"
      ></input>
      <input
        className="p-1 rounded-sm px-4 border-2 border-slate-300"
        ref={quantityRef}
        type="number"
        placeholder="Enter Quantity"
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

export default FarmerForm;
