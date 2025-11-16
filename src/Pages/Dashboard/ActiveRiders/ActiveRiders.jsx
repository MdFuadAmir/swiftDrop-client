import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTimesCircle } from "react-icons/fa";
import ErrorPage from "../../../Components/ErrorPage/ErrorPage";
import Loading from "../../../Components/Loading/Loading";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import toast from "react-hot-toast";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch active riders
  const {
    data: riders = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active-riders");
      return res.data;
    },
  });

  const handleDeactivate = async (id, action) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This rider will be deactivated!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, deactivate!",
      });
      if (!confirm.isConfirmed) return;
      await axiosSecure.patch(`/riders/${id}/status`, { status: action });
      toast.success("Done!", "Rider has been deactivated.", "success")
      refetch(); // refresh list
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading)
    return <Loading/>;
  if (isError)
    return (
      <ErrorPage/>
    );

  return (
    <div className="overflow-x-auto">
      <DashboardTitle title={"Active Riders"}/>
      <table className="table w-full">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>District</th>
            <th>Region</th>
            <th>Age</th>
            <th>NID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id} className="hover">
              <td>{index + 1}</td>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.contact}</td>
              <td>{rider.wirehouse}</td>
              <td>{rider.region}</td>
              <td>{rider.age}</td>
              <td>{rider.nid}</td>
              <td>{rider.status}</td>
              <td>
                <button
                  onClick={() => handleDeactivate(rider._id)}
                  className="btn btn-xs btn-error"
                >
                  <FaTimesCircle color="white" />
                </button>
              </td>
            </tr>
          ))}
          {riders.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center text-gray-500 py-6">
                No active riders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveRiders;
