import { FaTruckFast } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
         <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800 px-4">
      {/* Icon */}
      <FaTruckFast size={80} className="text-amber-500 mb-6" />

      {/* Error Text */}
      <h1 className="text-6xl font-extrabold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
      <p className="text-gray-500 max-w-md text-center mb-8">
        Oops! The page you’re looking for doesn’t exist or may have been moved.  
        Please check the URL or return to the homepage.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg shadow hover:bg-amber-600 transition"
      >
        Back to Home
      </Link>
    </div>
    );
};

export default ErrorPage;