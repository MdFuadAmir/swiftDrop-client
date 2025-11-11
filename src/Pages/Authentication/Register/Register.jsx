import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import logo from "../../../assets/allImages/image-upload-icon.png"
import axios from "axios";
import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {creatUser,updateUserProfile} = useAuth();
  const [profilePic,setProfilePic] = useState('');
  const axiosInstance = useAxios();
    const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';

  const handleImageUpload = async(e) =>{
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image',image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    const res = await axios.post(imageUploadUrl,formData);
    setProfilePic(res.data.data.url);
  }
  const onSubmit = (data) => {
    creatUser(data.email,data.password)
    .then(async(result) =>{
      const user = result.user;
      // update user profile info in database
      const userInfo = {
        email: user.email,
        role: 'user', //default role
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      }
      const userRes = await axiosInstance.post('/users',userInfo);
      console.log(userRes.data);
      
      // update user profile in firebase
      const userProfile = {
        displayName: data.name,
        photoUrl: profilePic
      }
      updateUserProfile(userProfile)
      .then(()=>{
        console.log('profile name,picture updaed');
        navigate(from);
      })
      .catch(error =>{
        console.log(error);
      }
      )
    })
    .catch(error =>{
      console.log(error);
    })
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-white text-center font-bold font-serif mb-6 text-2xl">
          SignUp !
        </h1>
        <fieldset className="fieldset max-w-sm mx-auto">
          {/* photo */}
          <div className="fieldset flex">
            <div className="flex">
            <img src={logo} alt="" />
            <input
            onChange={handleImageUpload}
              type="file"
              className="rounded-full w-12 h-12 text-transparent absolute border-red-600"
              placeholder="photo"
            />
            </div>
            <label className="label text-white">Your Photo</label>
          </div>
          {/* name */}
          <div className="fieldset">
            <label className="label text-white">Full Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input w-full"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* email */}
          <div className="fieldset">
            <label className="label text-white">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* password */}
          <div className="fieldset">
            <label className="label text-white">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                Password must be 6 charecters
              </span>
            )}
          </div>
          {/* submit button */}
          <button className="btn bg-green-500 border-none mt-4">Sign Up !</button>
          {/* troggl to sign up page */}
          <p className="text-amber-400 mt-4 text-center">
            Already have an account ?{" "}
            <Link to="/login" className="font-bold text-amber-600">
              Login
            </Link>
          </p>
        </fieldset>
        <div className=" divider divider-primary text-white my-4 max-w-sm mx-auto">
          OR
        </div>
      </form>
      <div className="max-w-sm mx-auto">
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
