import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import TrackFarmABI from "./components/TrackFarmABI.json";
const App = () => {
  const [account, setAccount] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [product, setProduct] = useState({});

  const cropRef = useRef(null);
  const locRef = useRef(null);
  const fertRef = useRef(null);
  const dateRef = useRef(null);
  const quantityRef = useRef(null);
  const idRef = useRef(null);

  const contractAddress = "0x28eEcA1B4619c94B8A4e49c88714C8CD2DFd66C9";
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

  const getProductDetails = async () => {
    let id = idRef.current.value;
    console.log(id);
    const { contract } = state;
    try {
      const tx = await contract.getProductData(id);
      const data = tx.toString();
      setProduct(data);
      console.log(typeof data);
    } catch (error) {
      console.log(error);
    }

    console.log("Details fetched");
  };

  const addProductDetails = async () => {
    const { contract } = state;

    let productId = 4;
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
    } catch (error) {
      console.log(error);
    }
    product;
    console.log("Details Added");
  };

  return (
    <div>
      <h1>TrackFarm</h1>
      <header>
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <>
            <p>Connected Account: {account}</p>
          </>
        )}
      </header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input ref={cropRef} type="text" placeholder="Enter Croptype"></input>
        <input ref={locRef} type="text" placeholder="Enter Location"></input>
        <input ref={fertRef} type="text" placeholder="Enter Fertiliser"></input>
        <input
          ref={dateRef}
          type="number"
          placeholder="Enter HarvestDate"
        ></input>
        <input
          ref={quantityRef}
          type="number"
          placeholder="Enter Quantity"
        ></input>
        <button
          style={{ margin: "5px" }}
          onClick={() => {
            addProductDetails();
          }}
        >
          Add Data
        </button>
      </div>
      <input ref={idRef} type="number" placeholder="Enter Product ID"></input>
      <button style={{ margin: "5px" }} onClick={getProductDetails}>
        Get Data
      </button>
      {product ? <p>Product Details :{product}</p> : <p>No Data to show</p>}
    </div>
  );
};

export default App;
