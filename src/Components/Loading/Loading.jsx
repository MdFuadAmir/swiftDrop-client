import { FaTruckFast } from "react-icons/fa6";


const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-gray-500 via-gray-200 to-gray-600 text-black">
      {/* Truck Icon + Name */}
      <div className="flex items-center gap-3 mb-6">
        <FaTruckFast size={50} className="text-amber-400 animate-bounce" />
        <h2 className="text-3xl font-bold tracking-wider">SwiftDrop</h2>
      </div>

      {/* Loading Text */}
      <p className="text-gray-800 text-lg mb-4 text-center">
        Loading your delivery experience...
      </p>

      {/* Dots Animation */}
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-amber-400 rounded-full animate-ping"></span>
        <span className="w-3 h-3 bg-amber-400 rounded-full animate-ping [animation-delay:200ms]"></span>
        <span className="w-3 h-3 bg-amber-400 rounded-full animate-ping [animation-delay:400ms]"></span>
      </div>
    </div>
  );
};

export default Loading;
