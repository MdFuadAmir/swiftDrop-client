import { Link, NavLink } from "react-router";
import SwiftdropLogo from "../SwiftDropLogo/SwiftdropLogo";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navber = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("logOut Success !");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Sand A Parcel</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/beARider">Be A Ride</NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-linear-to-b from-gray-600 via-gray-400 to-gray-600 px-4 md:px-10 lg:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <SwiftdropLogo></SwiftdropLogo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn bg-red-500">
            LogOut
          </button>
        ) : (
          <Link to="/login" className="btn bg-green-500">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navber;
