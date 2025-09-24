import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";


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
        const res = await axiosInstance.post('/users',userInfo);
        console.log('user update info', res.data);
        console.log('user:', result.user);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button
        onClick={haldleGoogleSignIn}
        className="btn rounded-full w-full flex justify-center"
      >
        <FaGoogle size={20} className="mr-4" /> Login With Google
      </button>
    </div>
  );
};

export default SocialLogin;
