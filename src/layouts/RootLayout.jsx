import { Outlet } from "react-router";
import Navber from "../Shared/Navber/Navber";
import Footer from "../Shared/Footer/Footer";


const RootLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;