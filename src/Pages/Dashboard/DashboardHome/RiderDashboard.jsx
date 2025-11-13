import { FaTruck, FaMoneyBillWave, FaClock, FaBox } from "react-icons/fa";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import { Chart } from "react-google-charts";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useUserRole from "../../../Hooks/useUserRole";
import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
const RiderDashboard = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  // const axiosSecure = useAxiosSecure();

  // const { data: stateData = {}, isLoading } = useQuery({
  //   queryKey: ["riderStat", user?.email],
  //   enabled: !!user?.email,
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get(`/rider-stat/${user?.email}`);
  //     return data;
  //   },
  // });
  // console.log(stateData);

  const data = [
    ["Task", "Hours per Day"],
    ["My Earning", 9],
    ["Total Percel", 2],
    ["Delevered", 2],
    ["Pending", 2],
  ];

  const options = {
    title: "My Daily Activities",
  };
  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <DashboardTitle title={"Rider Performance Dashboard"} />
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
          {/* Assigned Deliveries */}
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
            <div className="p-4 rounded-xl bg-green-100">
              <FaMoneyBillWave className="text-green-500 text-4xl" />
            </div>
            <div className="text-end">
              <h2 className="text-lg font-semibold text-gray-800">
                My Earning
              </h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">৳ --</p>
            </div>
          </div>
          {/* Total Parcels */}
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
            <div className="p-4 rounded-xl bg-indigo-100">
              <FaBox className="text-indigo-500 text-4xl" />
            </div>
            <div className="text-end">
              <h2 className="text-lg font-semibold text-gray-800">
                Total Parcels
              </h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">--</p>
            </div>
          </div>
          {/* Pending Deliveries */}
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
            <div className="p-4 rounded-xl bg-yellow-100">
              <FaClock className="text-yellow-500 text-4xl" />
            </div>
            <div className="text-end">
              <h2 className="text-lg font-semibold text-gray-800">Pending</h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">--</p>
            </div>
          </div>
          {/* Completed Deliveries */}
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
            <div className="p-4 rounded-xl bg-yellow-100">
              <FaTruck className="text-yellow-500 text-4xl" />
            </div>
            <div className="text-end">
              <h2 className="text-lg font-semibold text-gray-800">Delivered</h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">--</p>
            </div>
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

export default RiderDashboard;
