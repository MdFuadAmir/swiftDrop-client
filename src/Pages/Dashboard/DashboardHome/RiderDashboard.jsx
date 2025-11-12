import { FaTruck, FaClock, FaMoneyBillWave, FaBoxOpen } from "react-icons/fa";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
const RiderDashboard = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <DashboardTitle title={"Rider Performance Dashboard"}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Assigned Deliveries */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaBoxOpen className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">
              Assigned Parcels
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">127</p>
            <p className="text-gray-500 text-sm">5 new today</p>
          </div>

          {/* Completed Deliveries */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaTruck className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">Completed</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">102</p>
            <p className="text-gray-500 text-sm">92% success rate</p>
          </div>

          {/* Average Delivery Time */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaClock className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">
              Avg. Delivery Time
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">28 min</p>
            <p className="text-gray-500 text-sm">On-time: 87%</p>
          </div>

          {/* Earnings */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaMoneyBillWave className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">
              Total Earnings
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">$890</p>
            <p className="text-gray-500 text-sm">+2% this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
