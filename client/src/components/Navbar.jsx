// import React from "react";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  return (
    <div className="w-full h-26 flex gap-2 bg-slate-100">
      <nav className="w-full flex justify-evenly items-center m-3 gap-3">
        <h2 className="font-bold text-4xl text-green-800">TrackFarm</h2>

        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 text-xl rounded-3xl transition-colors delay-150 ${
                isActive
                  ? "bg-green-800 text-white"
                  : "hover:bg-green-800 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 text-xl rounded-3xl transition-colors delay-150 ${
                isActive
                  ? "bg-green-800 text-white"
                  : "hover:bg-green-800 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-4 py-2 text-xl rounded-3xl transition-colors delay-150 ${
                isActive
                  ? "bg-green-800 text-white"
                  : "hover:bg-green-800 hover:text-white"
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        <div className="px-4 py-2 rounded-3xl transition-colors delay-150 text-black hover:bg-slate-300 hover:text-green-900">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
