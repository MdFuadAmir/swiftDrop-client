import { FaBoxOpen, FaTruck, FaMoneyBillWave, FaHistory } from "react-icons/fa";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import { Chart } from "react-google-charts";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";

const UserDashboard = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 9],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "My Daily Activities",
  };
  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <DashboardTitle title={"Your Delivery Summary"} />
          <div className="bg-gray-300 px-6 py-2 rounded flex items-center gap-3">
            <img
              src={user?.photoURL}
              alt="/photo"
              className="h-12 w-12 rounded-full border border-amber-500"
            />
            <div>
              <p className="text-md font-semibold">{user?.displayName}</p>
              <p className="text-sm text-gray-700">{user?.email}</p>
              <p className="text-sm text-amber-500 font-bold">{role}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Orders */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <FaBoxOpen className="text-gray-700 text-3xl mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800">
              Total Orders
            </h2>
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
            <h2 className="text-lg font-semibold text-gray-800">
              Delivery History
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">24 Orders</p>
            <p className="text-gray-500 text-sm">Last delivered: 2 days ago</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 col-span-2 bg-gray-300 rounded-xl shadow-xl">
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </div>
          <div className="p-4 col-span-1 h-fit flex justify-center items-center bg-gray-300 rounded-xl shadow-xl">
            <DateRange className="rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
