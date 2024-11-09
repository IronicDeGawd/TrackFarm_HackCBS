import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";

function Home() {
  return (
    <>
      <Navbar />

      <div className=" w-full h-screen overflow-y-hidden flex flex-col items-center justify-center">
        {/*Hero Section*/}
        <div className="grid grid-cols-2 w-3/4 place-items-center">
          {/*Left Section*/}
          <div className="flex w-full flex-col text-center gap-4 justify-center items-start">
            <div className="flex flex-col font-bold text-5xl text-green-900 text-start">
              <span>TRANSPARENCY</span>
              <span>THROUGH</span>
              <span>TRACEBILITY</span>
            </div>
            <p className=" text-start text-lg">
              Farm-to-Fork Transparency. Revolutionize the food supply chain by
              creating a transparent and traceable system using blockchain
              technology
            </p>
            <div className="items-center grid grid-cols-2 gap-4">
              <button className="bg-green-800 text-white px-4 py-2 rounded-3xl hover:opacity-75 transition-opacity delay-150">
                <Link className="flex justify-center gap-2 items-center">
                  <span className="material-symbols-outlined">add</span>
                  <span>Add Products</span>
                </Link>
              </button>
              <button className="bg-green-800 text-white px-4 py-2 rounded-3xl hover:opacity-75 transition-opacity delay-150">
                <Link className="flex justify-center gap-2 items-center">
                  <span className="material-symbols-outlined">search</span>
                  <span>Search Products</span>
                </Link>
              </button>
            </div>
          </div>

          {/*Right Section*/}
          <Carousel />
        </div>
      </div>
    </>
  );
}

export default Home;
