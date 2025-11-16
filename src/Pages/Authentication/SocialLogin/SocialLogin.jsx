import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";


const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";
  const axiosInstance = useAxios();

  const haldleGoogleSignIn = () => {
    googleSignIn()
      .then(async(result) => {
        const user = result.user;
        // update user profile info in database
        const userInfo = {
          email: user.email,
          role: "user", //default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        await axiosInstance.post('/users',userInfo);
        toast.success("Login Successful!");
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };
  return (
    <div>
      <button
        onClick={haldleGoogleSignIn}
        className="btn rounded-lg w-full flex justify-center bg-teal-700 text-white border-none"
      >
        <FaGoogle size={20} className="mr-4" /> Login With Google
      </button>
    </div>
  );
};

export default SocialLogin;
