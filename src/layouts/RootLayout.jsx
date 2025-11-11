import { Outlet } from "react-router";
import Navber from "../Shared/Navber/Navber";
import Footer from "../Shared/Footer/Footer";


const RootLayout = () => {
    return (
        <div className="bg-gray-100">
            <Navber></Navber>
            <div className="min-h-[calc(100vh-64px)] max-w-[2520px] mx-auto md:px-10 lg:px-20">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;