import { FaBoxOpen, FaTruck, FaMoneyBillWave, FaHistory } from "react-icons/fa";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import { Chart } from "react-google-charts";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserDashboard = () => {
  const { user } = useAuth();
  const { role,roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ["userStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-stat/${user.email}`);
      return data;
    },
  });
  const data = [
    ["Task", "Hours per Day"],
    ["Total parcel", Number(statData?.totalParcels || 0)],
    ["Delivered", Number(statData?.deliveredParcels || 0)],
  ];
  const options = {
    title: "My Daily Activities",
  };
  if (isLoading || roleLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <DashboardTitle title={`Welcome Back, ${user?.displayName}!`} />
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
          {/* Total Spent */}
          <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
            <div className="bg-green-100 p-4 rounded-xl">
              <FaMoneyBillWave className="text-green-500 text-4xl" />
            </div>
            <div className="text-end">
              <h2 className="text-lg font-semibold text-gray-800">
                Total Spent
              </h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ৳ {statData?.totalSpent}
              </p>
            </div>
          </div>
          {/* Total parcel */}
          <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
            <div className="bg-indigo-100 p-4 rounded-xl">
              <FaBoxOpen className="text-indigo-500 text-4xl" />
            </div>
            <div className="text-end">
              <h2 className="text-lg font-semibold text-gray-800">
                Total parcel
              </h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {statData?.totalParcels}
              </p>
            </div>
          </div>
          {/* Delivered Parcels */}
          <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
            <div className="bg-yellow-100 p-4 rounded-xl">
              <FaTruck className="text-yellow-500 text-4xl" />
            </div>
            <div className="text-end">
              <h2 className="text-lg font-semibold text-gray-800">Delivered</h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {statData?.deliveredParcels}
              </p>
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

export default UserDashboard;
