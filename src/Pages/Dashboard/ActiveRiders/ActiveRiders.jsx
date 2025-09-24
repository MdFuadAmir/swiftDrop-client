import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTimesCircle } from "react-icons/fa";

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
      Swal.fire("Done!", "Rider has been deactivated.", "success");
      refetch(); // refresh list
    } catch (error) {
      Swal.fire("Error", "Could not deactivate rider", error);
    }
  };

  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (isError)
    return (
      <p className="text-center text-red-500 p-4">Error loading riders!</p>
    );

  return (
    <div className="overflow-x-auto p-4 md:p-12">
      <h2 className="text-2xl font-bold mb-4 underline">Active Riders</h2>
      <table className="table w-full">
        <thead className="bg-gray-100">
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
