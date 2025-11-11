import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import logo from "../../../assets/allImages/riders.png"

const BeARider = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [districts, setDistrict] = useState([]);

  //   district name
  useEffect(() => {
    fetch("warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueDistricts = [...new Set(data.map((item) => item.district))];
        setDistrict(uniqueDistricts);
      });
  }, []);

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "panding",
      created_at: new Date().toISOString(),
    };
    console.log("rider application", riderData);
    axiosSecure.post("/riders", riderData)
    .then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Application has been send",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      reset();
    });
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row">
        <div className="mx-auto w-full md:w-1/2 p-6 my-10">
        
        <h2 className="text-2xl font-bold  mb-2">
        Apply to Work With Us
      </h2>
      <p className=" text-gray-600 mb-6">
        Fill out the form to join as a warehouse worker
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            {...register("name")}
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            {...register("email")}
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            {...register("age", { required: true })}
            placeholder="Enter your age"
            className="input input-bordered w-full"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            type="tel"
            {...register("contact", { required: true })}
            placeholder="Enter your phone number"
            className="input input-bordered w-full"
          />
        </div>

        {/* NID Number */}
        <div>
          <label className="block mb-1 font-medium">NID Number</label>
          <input
            type="text"
            {...register("nid", { required: true })}
            placeholder="Enter your NID"
            className="input input-bordered w-full"
          />
        </div>

        {/* region Selection */}
        <div>
          <label className="block mb-1 font-medium">Region</label>
          <select
            {...register("region", { required: true })}
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

        </div>

        {/* work-house Selection */}
        <div>
          <label className="block mb-1 font-medium">
            Which Wire-house you want to work?
          </label>
          <select
            {...register("wirehouse", { required: true })}
            className="select select-bordered w-full"
            defaultValue="Dhaka"
          >
            {districts.map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Application
        </button>
      </form>
    </div>
        {/* image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
        <img src={logo} alt="" />
        </div>
    </div>
  );
};

export default BeARider;
