import { Outlet } from "react-router";
import image from "../assets/allImages/authImage.png";
import SwiftdropLogo from "../Shared/SwiftDropLogo/SwiftdropLogo";
const AuthLayout = () => {
  return (
      <div className="bg-gray-900 mx-auto max-w-7xl p-4 md:p-12">
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
