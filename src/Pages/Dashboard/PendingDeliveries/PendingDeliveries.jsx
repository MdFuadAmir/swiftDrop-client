import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useTrackingLoggers from "../../../Hooks/useTrackingLoggers";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { logTracking } = useTrackingLoggers();

  // Load rider assigned parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation: update parcel delivery status
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ parcel, status }) => {
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["riderParcels", user?.email]);
    },
  });
  // ✅ Corrected function
  const handleStatusUpdate = (parcel, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ parcel, status: newStatus }) // ✅ only send parcelId
          .then(async () => {
            Swal.fire("Updated!", "Parcel status updated.", "success");
            // log tracking
            let trackingDetails = `Picked up by ${user?.displayName}`;
            if (newStatus === "delivered") {
              trackingDetails = `Delivered by ${user?.displayName}`;

            }
            await logTracking({
              trackingId: parcel.trackingId,
              status: newStatus,
              details: trackingDetails,
              updated_by: user.email,
            });
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to update status.", "error");
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No assigned deliveries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Receiver</th>
                <th>Receiver Center</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.reciverName}</td>
                  <td>{parcel.reciverPickupWirehouse}</td>
                  <td>৳{parcel.cost}</td>
                  <td className="capitalize">
                    {parcel.delivery_status.replace("_", " ")}
                  </td>
                  <td>
                    {parcel.delivery_status === "rider_assigned" && (
                      <button
                        className="btn btn-sm btn-primary text-white"
                        onClick={() => handleStatusUpdate(parcel, "in_transit")}
                      >
                        Mark Picked Up
                      </button>
                    )}
                    {parcel.delivery_status === "in_transit" && (
                      <button
                        className="btn btn-sm btn-success text-black"
                        onClick={() => handleStatusUpdate(parcel, "delivered")}
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
