import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
const Forbidden = () => {
    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-100 via-red-200 to-red-300 text-gray-800">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg">
        <FaLock className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
        <p className="text-gray-600 mb-6">
          Sorry 😥 You don’t have permission to access this page.  
          Please contact your administrator if you think this is a mistake.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
          >
            Go Home
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-md transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
    );
};

export default Forbidden;