import { FaSearchLocation, FaBox, FaClock, FaCheckCircle } from "react-icons/fa";

const TrackParcel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Track Your Parcel
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter your tracking ID to check your parcel’s current status and estimated delivery time.
        </p>

        {/* Tracking Input */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter Tracking ID..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition flex items-center gap-2">
            <FaSearchLocation /> Track
          </button>
        </div>

        {/* Tracking Status */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Parcel Status
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="bg-gray-200 p-4 rounded-full text-gray-700 mb-2">
                <FaBox size={24} />
              </div>
              <h3 className="font-medium text-gray-800">Picked Up</h3>
              <p className="text-sm text-gray-500">Parcel received by courier</p>
            </div>

            {/* Line */}
            <div className="hidden sm:block h-1 w-16 bg-gray-300"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="bg-gray-300 p-4 rounded-full text-gray-700 mb-2">
                <FaClock size={24} />
              </div>
              <h3 className="font-medium text-gray-800">In Transit</h3>
              <p className="text-sm text-gray-500">On the way to destination</p>
            </div>

            {/* Line */}
            <div className="hidden sm:block h-1 w-16 bg-gray-300"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="bg-gray-800 p-4 rounded-full text-white mb-2">
                <FaCheckCircle size={24} />
              </div>
              <h3 className="font-medium text-gray-800">Delivered</h3>
              <p className="text-sm text-gray-500">Parcel reached recipient</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-400 text-sm mt-10">
          Need help? <a href="/contact" className="text-gray-700 hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default TrackParcel;
