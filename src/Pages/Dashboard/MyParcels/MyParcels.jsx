import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?.email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      axiosSecure.delete(`/parcels/${id}`).then((res) => {
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      });
    }
  };
  // pay settings
  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };
  // local date and time
  const formetDate = (iso) => {
    return new Date(iso).toLocaleString();
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 h-full">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-center">My-Parcels</h1>
        <p className="text-sm text-center">this is my parcels history</p>
      </div>
      <div className="overflow-x-auto bg-white p-2 md:p-4 rounded-2xl">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Type</th>
              <th>Parcel Name</th>
              <th>Creation_date</th>
              <th>trackingId</th>
              <th>cost</th>
              <th>payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.type}</td>
                <td>{parcel.parcelName}</td>
                <td>{formetDate(parcel.creation_date)}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.cost}/=</td>
                <td>
                  {(parcel.payment_status === "unpaid" && (
                    <p className="text-red-500 font-bold">unpaid</p>
                  )) || <p className="text-green-500 font-bold">paid</p>}
                </td>
                <td className="px-4">
                  <div className="flex gap-2">
                    {/* View Button */}
                    <button className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
                      View
                    </button>
                    {/* Pay Button */}
                    {parcel.payment_status === "unpaid" && (
                      <button
                        onClick={() => handlePay(parcel._id)}
                        className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                      >
                        Pay
                      </button>
                    )}
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
