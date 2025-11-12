import { FaBoxOpen, FaTruck, FaMoneyBillWave, FaHistory } from "react-icons/fa";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";


const UserDashboard = () => {
    return (
         <div>
      <div className="max-w-5xl mx-auto">
        <DashboardTitle title={"Your Delivery Summary"}/>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Orders */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaBoxOpen className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">24</p>
            <p className="text-gray-500 text-sm">2 pending deliveries</p>
          </div>

          {/* Delivered Parcels */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaTruck className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">Delivered</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">18</p>
            <p className="text-gray-500 text-sm">94% delivery success</p>
          </div>

          {/* Total Spent */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaMoneyBillWave className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">Total Spent</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">$120</p>
            <p className="text-gray-500 text-sm">+2% from last month</p>
          </div>

          {/* Delivery History */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaHistory className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">Delivery History</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">24 Orders</p>
            <p className="text-gray-500 text-sm">Last delivered: 2 days ago</p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default UserDashboard;