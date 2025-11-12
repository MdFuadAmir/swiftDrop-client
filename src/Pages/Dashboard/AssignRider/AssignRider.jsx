import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMotorcycle } from "react-icons/fa";
import { useState } from "react";
import useTrackingLoggers from "../../../Hooks/useTrackingLoggers";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRider, setSelectedRider] = useState(null);
  const { logTracking } = useTrackingLoggers();
  const { user } = useAuth();

  const {
    data: parcels = [],
    isLoading: parcelLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?payment_status=paid&delivery_status=not_collected`
      );
      return res.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    },
  });
  const { data: riders = [], isLoading: riderLoading } = useQuery({
    queryKey: ["riders", selectedParcel?.reciverPickupWirehouse],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const wirehouse = selectedParcel.reciverPickupWirehouse;
      const res = await axiosSecure.get(
        `/riders/available?wirehouse=${wirehouse}`
      );
      return res.data;
    },
  });
  const openAssignModal = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById("assign_rider_modal").showModal();
  };
  const handleAssignRider = async (riderId,rider) => {
    setSelectedRider(rider);
    try {
      await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign`, {
        riderId,
      });
      toast.success("Success", "Rider assigned successfully!", "success")
      await logTracking({
        trackingId: selectedParcel.trackingId,
        status: "rider_assigned",
        details: `Assigned to ${selectedRider?.name}`,
        updated_by: user.email,
      });
      document.getElementById("assign_rider_modal").close();
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <DashboardTitle title={"Assign Riders"}/>
      {/* Parcels Table */}
      <div className="overflow-x-auto">
        <table className="table  w-full">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th>#</th>
              <th>Tracking Id</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Sender Address</th>
              <th>Receiver Address</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcelLoading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  Loading parcels...
                </td>
              </tr>
            ) : parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.reciverName}</td>
                  <td>${parcel.cost}</td>
                  <td>{parcel.SenderPickupWirehouse}</td>
                  <td>{parcel.reciverPickupWirehouse}</td>
                  <td>
                    <span className="badge badge-success">
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-warning">
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => openAssignModal(parcel)}
                      className="btn btn-sm btn-primary flex items-center gap-1"
                    >
                      <FaMotorcycle size={16} /> Assign Rider
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Rider Assign Modal */}
      <dialog id="assign_rider_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="text-xl font-semibold mb-4">
            Riders in {selectedParcel?.reciverPickupWirehouse}
          </h3>

          {riderLoading ? (
            <Loading/>
          ) : riders.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>District</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id}>
                    <td>{index + 1}</td>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.contact}</td>
                    <td>{rider.wirehouse}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider._id)}
                        className="btn btn-sm btn-success"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No riders found in this district.</p>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
