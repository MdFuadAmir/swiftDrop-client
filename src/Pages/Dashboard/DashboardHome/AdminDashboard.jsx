import { FaUsers, FaBoxOpen, FaTruck, FaMoneyBillWave } from "react-icons/fa";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";


const AdminDashboard = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <DashboardTitle title={" Admin Dashboard Overview"}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaUsers className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">Total Users</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">1,245</p>
            <p className="text-gray-500 text-sm">+3% from last week</p>
          </div>

          {/* Total Parcels */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaBoxOpen className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">
              Total Parcels
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">4,310</p>
            <p className="text-gray-500 text-sm">+5% from last month</p>
          </div>

          {/* Completed Deliveries */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaTruck className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">Deliveries</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">3,870</p>
            <p className="text-gray-500 text-sm">92% success rate</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaMoneyBillWave className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">
              Total Revenue
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">$12,450</p>
            <p className="text-gray-500 text-sm">+8% overall growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
