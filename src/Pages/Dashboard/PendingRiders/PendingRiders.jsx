// src/Pages/Admin/PendingRiders.jsx
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch pending riders
  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending-riders");
      console.log(res.data);
      return res.data;
    },
  });

  if (isPending) {
    return <Loading />;
  }

  // View Rider Details
  const handleView = (rider) => {
    Swal.fire({
      title: rider.name,
      html: `
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Email:</span> ${
          rider.email || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Contact:</span> ${
          rider.contact || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">District:</span> ${
          rider.wirehouse || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Region:</span> ${
          rider.region || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Nid no:</span> ${
          rider.nid || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Age:</span> ${
          rider.age || "—"
        }</div>
        
              
      `,
      confirmButtonText: "Close",
    });
  };
  // Accept / Reject Rider
  const handleStatusChange = async (id, action, email) => {
    try {
      await axiosSecure.patch(`/riders/${id}/status`, {
        status: action,
        email,
      });
      refetch();
      Swal.fire(
        "Success",
        `Rider has been ${
          action === "accepted" ? "active" : "inactive"
        } successfully.`,
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "Could not update rider status.", error);
    }
  };
  return (
    <div className="overflow-x-auto">
      <DashboardTitle title={"Rider Applications"}/>
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
              <td className="flex gap-2">
                <button
                  onClick={() => handleView(rider)}
                  className="btn btn-xs btn-info"
                >
                  <FaEye color="white" />
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(rider._id, "active", rider?.email)
                  }
                  className="btn btn-xs btn-success"
                >
                  <FaCheckCircle color="white" />
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(rider._id, "inactive", rider?.email)
                  }
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
                No pending applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRiders;
