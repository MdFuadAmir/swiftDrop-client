import { Link } from "react-router";
// import logo from "../../assets/swiftdrop.png"

const SwiftdropLogo = () => {
    return (
        <Link to='/' className="text-2xl font-bold uppercase text-teal-600 flex items-center">
            <img src={'https://i.ibb.co.com/bMDwp740/swiftdrop.png'} alt="logo" className="h-8" /> Swiftdrop
        </Link>
    );
};

export default SwiftdropLogo;