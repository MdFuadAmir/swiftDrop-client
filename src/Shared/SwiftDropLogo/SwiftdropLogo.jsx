import { Link } from "react-router";
import logo from "../../assets/swiftdrop.png"

const SwiftdropLogo = () => {
    return (
        <Link to='/'>
            <img src={logo} alt="" className="w-24"/>
        </Link>
    );
};

export default SwiftdropLogo;