import { useState } from "react";
import {
  FaSearchLocation,
  FaBox,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setLoading(true);
    setError("");
    setParcel(null);

    try {
      const { data } = await axiosSecure.get(`/parcel/${trackingId}`);
      setParcel(data);
    } catch (err) {
      setError("❌ No parcel found with this Tracking ID!", err);
    } finally {
      setLoading(false);
    }
  };

  // status check helpers
  const isPicked = parcel && parcel.delivery_status !== "pending";
  const isTransit = parcel && parcel.delivery_status === "in_transit";
  const isDelivered = parcel && parcel.delivery_status === "delivered";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Track Your Parcel
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter your tracking ID to check your parcel’s current status.
        </p>

        {/* Tracking Input */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          <button
            onClick={handleTrack}
            disabled={loading}
            className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            <FaSearchLocation /> {loading ? "Tracking..." : "Track"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 font-medium mt-4">{error}</p>
        )}

        {/* Tracking Status */}
        {parcel && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center sm:text-left">
              Parcel Status
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center sm:items-start">
                <div
                  className={`p-4 rounded-full mb-2 ${
                    isPicked
                      ? "bg-green-200 text-green-700"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FaBox size={24} />
                </div>
                <h3 className="font-medium text-gray-800">Picked Up</h3>
                <p className="text-sm text-gray-500">
                  Parcel received by courier
                </p>
              </div>

              <div className="hidden sm:block h-1 w-16 bg-gray-300"></div>

              {/* Step 2 */}
              <div className="flex flex-col items-center sm:items-start">
                <div
                  className={`p-4 rounded-full mb-2 ${
                    isTransit
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FaClock size={24} />
                </div>
                <h3 className="font-medium text-gray-800">In Transit</h3>
                <p className="text-sm text-gray-500">
                  On the way to destination
                </p>
              </div>

              <div className="hidden sm:block h-1 w-16 bg-gray-300"></div>

              {/* Step 3 */}
              <div className="flex flex-col items-center sm:items-start">
                <div
                  className={`p-4 rounded-full mb-2 ${
                    isDelivered
                      ? "bg-green-700 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FaCheckCircle size={24} />
                </div>
                <h3 className="font-medium text-gray-800">Delivered</h3>
                <p className="text-sm text-gray-500">
                  Parcel reached recipient
                </p>
              </div>
            </div>

            {/* Parcel Info */}
            <div className="mt-10 bg-gray-50 p-5 rounded-xl border text-gray-700">
              <h3 className="text-lg font-semibold mb-3">📦 Parcel Details</h3>
              <p>
                <span className="font-semibold">Name:</span> {parcel.parcelName}
              </p>
              <p>
                <span className="font-semibold">Sender:</span>{" "}
                {parcel.senderName}
              </p>
              <p>
                <span className="font-semibold">Receiver:</span>{" "}
                {parcel.reciverName}
              </p>
              <p>
                <span className="font-semibold">Current Status:</span>{" "}
                {parcel.delivery_status}
              </p>
              <p>
                <span className="font-semibold">Tracking ID:</span>{" "}
                {parcel.trackingId}
              </p>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-gray-400 text-sm mt-10">
          Need help?{" "}
          <Link to="/" className="text-gray-700 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TrackParcel;
