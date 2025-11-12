// src/Pages/AddParcel/AddParcel.jsx
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useTrackingLoggers from "../../Hooks/useTrackingLoggers";
import toast from "react-hot-toast";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { SenderPickupWirehouse: "Dhaka", type: "document" },
  });
  const { user } = useAuth();
  const [districts, setDistrict] = useState([]);
  const [cost, setCost] = useState(0);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { logTracking } = useTrackingLoggers();

  useEffect(() => {
    fetch("warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueDistricts = [...new Set(data.map((item) => item.district))];
        setDistrict(uniqueDistricts);
      });
  }, []);

  function generateTrackingId() {
    const prefix = "BD";
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const randomNum = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}-${year}${month}${day}-${randomNum}`;
  }

  const type = watch("type");
  const weight = watch("parcelWeight");
  const sender = watch("SenderPickupWirehouse");
  const delivery = watch("reciverPickupWirehouse");

  useEffect(() => {
    if (!type) return;

    const withinCity = sender === delivery;
    if (type === "document") {
      setCost(withinCity ? 60 : 80);
    } else if (type === "non-document") {
      if (!weight || weight <= 3) {
        setCost(withinCity ? 100 : 120);
      } else {
        const extra = (weight - 3) * 20;
        setCost(withinCity ? 100 + extra : 120 + extra + 30);
      }
    }
  }, [type, weight, sender, delivery]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      created_by: user?.email,
      cost,
      status: "Processing",
    };
    Swal.fire({
      title: "Order Confirmed!",
      html: `
        <p><b>Parcel:</b> ${type}</p>
        <p><b>Weight:</b> ${weight || "N/A"} kg</p>
        <p><b>From:</b> ${sender}</p>
        <p><b>To:</b> ${delivery}</p>
        <p><b>Total Cost:</b> ৳${cost}</p>
        <p><b>Tracking Id:</b> ৳${finalData.trackingId}</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Pay",
      cancelButtonText: "Continue Editing",
    }).then((result) => {
      if (result.isConfirmed) {
        const trackingId = generateTrackingId();
        const parcelData = {
          ...finalData,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          creation_date: new Date().toISOString(),
          trackingId,
        };
        // save data to backend
        axiosSecure.post("/parcels", parcelData).then(async (res) => {
          if (res.data.insertedId) {
            toast.success("Proceeding to payment getway.");
            await logTracking({
              trackingId: parcelData.trackingId,
              status: "parcel_created",
              details: `Created by ${user.displayName}`,
              updated_by: user.email,
            });
            navigate("/dashboard/myParcels");
          }
        });
      }
    });
  };

  return (
    <section>
      <div className="mx-auto px-4 my-12 py-12 rounded-2xl bg-gray-200">
        {/* heading */}
        <div className="p-4">
          <h2 className="text-3xl font-bold text-center mt-4">Send Parcel</h2>
          <p className="text-center text-gray-500 mb-8">
            Door to Door Delivery – Fill in pickup & delivery details
          </p>
        </div>
        {/* heading end*/}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4">
          {/* Parcel Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Enter your parcel details
            </h3>
            {/* Radio Buttons */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type")}
                  checked={type === "document"}
                  className="radio radio-primary"
                />
                <span>Document</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type")}
                  checked={type === "non-document"}
                  className="radio radio-primary"
                />
                <span>Non-Document</span>
              </label>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-6">
              {/* Parcel Name */}
              <div className="w-full md:w-1/2">
                <label className="block mb-1">Parcel Name</label>
                <input
                  {...register("parcelName", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter parcel name"
                />
                {errors?.parcelName?.type === "required" && (
                  <span className="p-2 text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Parcel Weight */}
              <div className="w-full md:w-1/2">
                <label className="block mb-1">Parcel Weight (kg)</label>
                <input
                  type="tel"
                  {...register("parcelWeight", {
                    required: type === "non-document",
                  })}
                  className="input input-bordered w-full"
                  placeholder="Enter parcel weight"
                  disabled={type === "document"}
                />
                {errors?.parcelWeight?.type === "required" && (
                  <span className="p-2 text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* parcel info end */}
          <div className="divider"></div>
          {/* ============= // =============== */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12">
            {/* ================= Sender Info ================ */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Sender Info</h3>
              <div className="gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sender Name */}
                  <div>
                    <label className="block mb-1 text-sm">Sender Name</label>
                    <input
                      {...register("senderName", { required: true })}
                      type="text"
                      defaultValue={user?.displayName}
                      placeholder="Sender Name"
                      className="input input-bordered w-full"
                    />
                    {errors?.senderName?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/*Sender Pickup Wire house  */}
                  <div>
                    <label className="block mb-1 text-sm">
                      Sender Pickup Wire house
                    </label>
                    <select
                      {...register("SenderPickupWirehouse", { required: true })}
                      className="select select-bordered w-full"
                    >
                      {districts.map((district, idx) => (
                        <option key={idx} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors?.SenderPickupWirehouse?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/* Sender Address */}
                  <div>
                    <label className="block mb-1 text-sm">Sender Address</label>
                    <input
                      {...register("senderAddress", { required: true })}
                      type="text"
                      placeholder="address"
                      className="input input-bordered w-full"
                    />
                    {errors?.senderAddress?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/* sender Contact number */}
                  <div>
                    <label className="block mb-1 text-sm">Contact No</label>
                    <input
                      {...register("senderContact", { required: true })}
                      type="number"
                      placeholder="contact number"
                      className="input input-bordered w-full"
                    />
                    {errors?.senderContact?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  {/* sender region */}
                  <div className="">
                    <label className="block mb-1 text-sm">Sender Region</label>
                    <select
                      {...register("SenderRegion", { required: true })}
                      className="select select-bordered w-full"
                    >
                      <option value="Islam">Islam</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Kristan">Kristan</option>
                      <option value="Boddo">Boddo</option>
                      <option value="Nastik">Nastik</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors?.SenderRegion?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/* sender pickup instruction */}
                  <div>
                    <label className="block mb-1 text-sm">
                      Pickup Instruction
                    </label>
                    <textarea
                      {...register("pickupInstruction", { required: true })}
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors?.pickupInstruction?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Receiver Info ///////////////////////////*/}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Reciver Info</h3>
              <div className="gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* reciver Name */}
                  <div>
                    <label className="block mb-1 text-sm">Reciver Name</label>
                    <input
                      {...register("reciverName", { required: true })}
                      type="text"
                      placeholder="reciver name"
                      className="input input-bordered w-full"
                    />
                    {errors?.reciverName?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/*Reciver Pickup Wire house  */}
                  <div>
                    <label className="block mb-1 text-sm">
                      Reciver Delivery Wire house
                    </label>
                    <select
                      {...register("reciverPickupWirehouse", {
                        required: true,
                      })}
                      className="select select-bordered w-full"
                    >
                      {districts.map((district, idx) => (
                        <option key={idx} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors?.reciverPickupWirehouse?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/* Reciver Address */}
                  <div>
                    <label className="block mb-1 text-sm">
                      Reciver Address
                    </label>
                    <input
                      {...register("reciverAddress", { required: true })}
                      type="text"
                      placeholder="address"
                      className="input input-bordered w-full"
                    />
                    {errors?.reciverAddress?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/* Reciver Contact number */}
                  <div>
                    <label className="block mb-1 text-sm">Contact No</label>
                    <input
                      {...register("reciverContact", { required: true })}
                      type="number"
                      placeholder="contact number"
                      className="input input-bordered w-full"
                    />
                    {errors?.reciverContact?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  {/* Reciver region */}
                  <div className="">
                    <label className="block mb-1 text-sm">Reciver Region</label>
                    <select
                      {...register("reciverRegion", {
                        required: true,
                      })}
                      className="select select-bordered w-full"
                    >
                      <option value="Islam">Islam</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Kristan">Kristan</option>
                      <option value="Boddo">Boddo</option>
                      <option value="Nastik">Nastik</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {/* reciver pickup instruction */}
                  <div>
                    <label className="block mb-1 text-sm">
                      Delivary Instruction
                    </label>
                    <textarea
                      {...register("delivaryInstruction", { required: true })}
                      placeholder="delivary Instruction"
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors?.delivaryInstruction?.type === "required" && (
                      <span className="text-red-500 p-2">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* total cost and order time */}
          <div className=" space-y-2">
            <p>
              Total Cost: <span className="Text-lg text-red-500">{cost}/=</span>
            </p>
            <p>* PickUp Time 4pm-7pm Approx.</p>
          </div>
          <button type="submit" className="btn bg-green-500 w-full">
            Submit Parcel
          </button>
        </form>
      </div>
    </section>
  );
};

export default SendParcel;
