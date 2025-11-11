import { Outlet } from "react-router";
import image from "../assets/allImages/authImage.png";
import SwiftdropLogo from "../Shared/SwiftDropLogo/SwiftdropLogo";
const AuthLayout = () => {
  return (
      <div className="bg-linear-to-br from-gray-800 to-gray-500 mx-auto md:p-12 min-h-[calc(100vh-64px)] max-w-[2520px] md:px-10 lg:px-20 p-4">
        <SwiftdropLogo></SwiftdropLogo>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-full md:w-1/2">
            <img src={image} className="w-full" />
          </div>
          <div className="w-full md:w-1/2">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    
  );
};

export default AuthLayout;
