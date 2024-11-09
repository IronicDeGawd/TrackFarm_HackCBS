// import React from 'react'
import { Protect } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import TrackFarmABI from "../components/TrackFarmABI.json";
import FarmerForm from "../components/FarmerForm";
import ManufacturerForm from "../components/ManufacturerForm";
import DistributorForm from "../components/DistributorForm";
import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";

const socket = io("http://localhost:3000");

const AddProduct = () => {
  //states
  const [addproductId, setAddProductId] = useState("");
  const [getproductId, setGetProductId] = useState("");
  const [account, setAccount] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [product, setProduct] = useState({});

  //refs
  const cropRef = useRef(null);
  const locRef = useRef(null);
  const fertRef = useRef(null);
  const dateRef = useRef(null);
  const quantityRef = useRef(null);
  const idRef = useRef(null);

  const productTypeRef = useRef(null);
  const manufactureDateRef = useRef(null);
  const quantityProducedRef = useRef(null);

  const destinationRef = useRef(null);
  const dispatchDateRef = useRef(null);
  const quantityDispatchedRef = useRef(null);

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
    // console.log(state);
  }, [contractABI]);

  //function to get product details from contract storage
  const getProductDetails = async () => {
    let id = getproductId;
    console.log(id);
    const { contract } = state;
    try {
      const tx = await contract.getProductData(id);
      const data = tx;
      setProduct(data);
      setGetProductId("");
    } catch (error) {
      console.log(error);
    }

    console.log("Details fetched");
  };

  //function to add the detail to contract storage
  const addFarmerDetails = async () => {
    const { contract } = state;

    let productId = addproductId;
    let cropType = cropRef.current.value;
    let location = locRef.current.value;
    let fertiliser = fertRef.current.value;
    let harvestDate = dateRef.current.value;
    let quantity = quantityRef.current.value;

    try {
      const tx = await contract.addProduct(
        productId,
        cropType,
        location,
        fertiliser,
        harvestDate,
        quantity
      );
      await tx.wait();
      setAddProductId("");
      cropType = "";
      location = "";
      fertiliser = "";
      harvestDate = "";
      quantity = "";
    } catch (error) {
      console.log(error);
    }
    product;
    console.log("Details Added");
  };

  const addManufacturerDetails = async () => {
    const { contract } = state;

    let productId = addproductId;
    let productType = productTypeRef.current.value;
    let manufactureDate = manufactureDateRef.current.value;
    let quantityProduced = quantityProducedRef.current.value;

    try {
      const tx = await contract.updateManufacturerData(
        productId,
        productType,
        manufactureDate,
        quantityProduced
      );
      await tx.wait();
      setAddProductId("");
      productType = "";
      manufactureDate = "";
      quantityProduced = "";
    } catch (error) {
      console.log(error);
    }
    console.log("Manufacturer Details Added");
  };

  const addDistributorDetails = async () => {
    const { contract } = state;

    let productId = addproductId;
    let destination = destinationRef.current.value;
    let dispatchDate = dispatchDateRef.current.value;
    let quantityDispatched = quantityDispatchedRef.current.value;

    try {
      const tx = await contract.updateDistributorData(
        productId,
        destination,
        dispatchDate,
        quantityDispatched
      );
      await tx.wait();
      setAddProductId("");
      destination = "";
      dispatchDate = "";
      quantityDispatched = "";
    } catch (error) {
      console.log(error);
    }
    console.log("Distributor Details Added");
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

      <div className="w-full pt-24 h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col w-full items-center justify-center">
          <header>
            {!account ? (
              <button
                className="bg-green-700 hover:bg-green-900 mb-4 rounded-md text-white p-2 w-2/4"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            ) : (
              <>
                <p className="bg-green-700 mb-4 rounded-md text-white p-2">
                  Connected Account: {account}
                </p>
              </>
            )}
          </header>
        </div>
        <Protect
          fallback={
            <div className="justify-center w-full h-screen flex items-center text-3xl">
              Not enough permissions, Please Login!!
              <Link
                className="mx-3 text-green-700 underline font-semibold"
                to="/"
              >
                Head Back Home
              </Link>
            </div>
          }
        >
          <div className="w-full main-content mt-26 grid grid-rows-2 place-items-center">
            <div className="w-full flex items-center justify-center">
              <ProductDetails
                product={product}
                handleGetUidScanner={handleGetUidScanner}
                idRef={idRef}
                getProductDetails={getProductDetails}
                getproductId={getproductId}
              />
            </div>
            <div className="flex w-full justify-center items-center flex-row">
              <FarmerForm
                handleAddUidScanner={handleAddUidScanner}
                addproductId={addproductId}
                cropRef={cropRef}
                locRef={locRef}
                fertRef={locRef}
                dateRef={dateRef}
                quantityRef={quantityRef}
                addProductDetails={addFarmerDetails}
              />
              <ManufacturerForm
                handleAddUidScanner={handleAddUidScanner}
                addproductId={addproductId}
                productTypeRef={productTypeRef}
                manufactureDateRef={manufactureDateRef}
                quantityProducedRef={quantityProducedRef}
                addProductDetails={addManufacturerDetails}
              />
              <DistributorForm
                handleAddUidScanner={handleAddUidScanner}
                addproductId={addproductId}
                destinationRef={destinationRef}
                dispatchDateRef={dispatchDateRef}
                quantityDispatchedRef={quantityDispatchedRef}
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
