import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {signIn} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';

  const onSubmit =(data)=>{
    signIn(data.email,data.password)
    .then(result =>{
      console.log(result.user);
      navigate(from);
    })
    .catch(error=>{
      console.log(error);
    })

  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-white text-center font-bold font-serif mb-6 text-2xl">
          Login !
        </h1>
        <fieldset className="fieldset max-w-sm mx-auto">
          {/* email */}
          <div className="fieldset">
            <label className="label text-white">Email</label>
            <input
            {...register("email",{required: true})}
             type="email" 
             className="input w-full" 
             placeholder="Email" />
             {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}
          </div>
          {/* password */}
          <div className="fieldset">
            <label className="label text-white">Password</label>
            <input
            {...register("password",{required: true,minLength: 6})}
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
            {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be 6 charecters</span>}
          </div>
          {/* foegot password */}
          <div>
            <a className="link link-hover text-white">Forgot password?</a>
          </div>
          {/* submit button */}
          <button className="btn bg-green-500 border-none mt-4">Login</button>
          {/* troggl to sign up page */}
          <p className="text-amber-400 mt-4 text-center">
            New Hare ?{" "}
            <Link state={{from}} to="/signUp" className="font-bold text-amber-600">
              Creat a Account
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

export default Login;
