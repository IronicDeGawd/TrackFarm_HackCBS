import { Protect } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TrackFarmABI from "../components/TrackFarmABI.json";
import FarmerForm from "../components/FarmerForm";
import ManufacturerForm from "../components/ManufacturerForm";
import DistributorForm from "../components/DistributorForm";
import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";

const socket = io("http://localhost:3000");

const AddProduct = () => {
  // states
  const [addproductId, setAddProductId] = useState("");
  const [getproductId, setGetProductId] = useState("");
  const [account, setAccount] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [product, setProduct] = useState({});

  // New state variables for each input field
  const [cropType, setCropType] = useState("");
  const [location, setLocation] = useState("");
  const [fertiliser, setFertiliser] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const [productType, setProductType] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [quantityProduced, setQuantityProduced] = useState("");

  const [destination, setDestination] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [quantityDispatched, setQuantityDispatched] = useState("");

  const contractAddress = "0xdA6f6bb7e745E35c9390c881d12151Be694f093C";
  const contractABI = TrackFarmABI;

  // Function to handle wallet connection
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied wallet connection:", error);
      }
    } else {
      console.error("MetaMask is not installed!");
    }
  };

  //use effect to check for connected wallet address
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };

    //function to set providers, signer and contract
    const init = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setState({ provider, signer, contract });
    };

    checkIfWalletIsConnected();
    init();
  }, [contractABI]);

  //function to get product details from contract storage
  const getProductDetails = async () => {
    let id = getproductId;
    const { contract } = state;
    try {
      const tx = await contract.getProductData(id);
      const data = tx;
      setProduct(data);
      setGetProductId("");
    } catch (error) {
      console.log(error);
    }
  };

  //function to add the detail to contract storage
  const addFarmerDetails = async () => {
    const { contract } = state;

    try {
      const tx = await contract.addProduct(
        addproductId,
        cropType,
        location,
        fertiliser,
        harvestDate,
        quantity
      );
      await tx.wait();
      setAddProductId("");
      setCropType("");
      setLocation("");
      setFertiliser("");
      setHarvestDate("");
      setQuantity("");
    } catch (error) {
      console.log(error);
    }
  };

  const addManufacturerDetails = async () => {
    const { contract } = state;
    let productId = addproductId;

    try {
      const tx = await contract.updateManufacturerData(
        productId,
        productType,
        manufactureDate,
        quantityProduced
      );
      await tx.wait();
      setAddProductId("");
      setProductType("");
      setManufactureDate("");
      setQuantityProduced("");
    } catch (error) {
      console.log(error);
    }
  };

  const addDistributorDetails = async () => {
    const { contract } = state;
    let productId = addproductId;

    try {
      const tx = await contract.updateDistributorData(
        productId,
        destination,
        dispatchDate,
        quantityDispatched
      );
      await tx.wait();
      setAddProductId("");
      setDestination("");
      setDispatchDate("");
      setQuantityDispatched("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUidScanner = () => {
    try {
      socket.on("scan-uid", (uid) => {
        let readUid = uid;
        setGetProductId(readUid);
      });
    } catch (error) {
      alert("Scan Failed", error);
      socket.off("scan-uid");
    }
  };

  const handleAddUidScanner = () => {
    try {
      socket.on("scan-uid", (uid) => {
        let readUid = uid;
        setAddProductId(readUid);
      });
    } catch (error) {
      alert("Scan Failed", error);
      socket.off("scan-uid");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full pt-6 min-h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col w-full items-center justify-center">
          <header>
            {!account ? (
              <button
                className="bg-green-700 hover:bg-green-900 mb-4 rounded-md text-white p-4 w-1/3"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            ) : (
              <p className="bg-green-700 mb-2 rounded-md text-white p-4 w-full text-center">
                Connected Account: {account}
              </p>
            )}
          </header>
        </div>
        <Protect
          fallback={
            <div className="flex items-center justify-center w-full h-screen text-3xl">
              <p>Not enough permissions. Please Login!</p>
              <Link className=" text-green-700 underline font-semibold" to="/">
                Head Back Home
              </Link>
            </div>
          }
        >
          <div className="w-full grid grid-rows-2 place-items-center gap-6">
            <div className="w-full flex items-center justify-center">
              <ProductDetails
                product={product}
                handleGetUidScanner={handleGetUidScanner}
                getProductDetails={getProductDetails}
                getproductId={getproductId}
              />
            </div>
            <div className="flex w-full justify-center items-center flex-wrap gap-8">
              <FarmerForm
                handleAddUidScanner={handleAddUidScanner}
                addproductId={addproductId}
                cropType={cropType}
                setCropType={setCropType}
                location={location}
                setLocation={setLocation}
                fertiliser={fertiliser}
                setFertiliser={setFertiliser}
                harvestDate={harvestDate}
                setHarvestDate={setHarvestDate}
                quantity={quantity}
                setQuantity={setQuantity}
                addProductDetails={addFarmerDetails}
              />
              <ManufacturerForm
                handleAddUidScanner={handleAddUidScanner}
                addproductId={addproductId}
                productType={productType}
                setProductType={setProductType}
                manufactureDate={manufactureDate}
                setManufactureDate={setManufactureDate}
                quantityProduced={quantityProduced}
                setQuantityProduced={setQuantityProduced}
                addProductDetails={addManufacturerDetails}
              />
              <DistributorForm
                handleAddUidScanner={handleAddUidScanner}
                addproductId={addproductId}
                destination={destination}
                setDestination={setDestination}
                dispatchDate={dispatchDate}
                setDispatchDate={setDispatchDate}
                quantityDispatched={quantityDispatched}
                setQuantityDispatched={setQuantityDispatched}
                addProductDetails={addDistributorDetails}
              />
            </div>
          </div>
        </Protect>
      </div>
    </>
  );
};

export default AddProduct;
