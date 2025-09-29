import { NavLink, Outlet } from "react-router";
import SwiftdropLogo from "../Shared/SwiftDropLogo/SwiftdropLogo";
import {
  FaBox,
  FaMoneyBillWave,
  FaSearchLocation,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaMotorcycle,
  FaTasks,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* page content hear */}
        <Outlet></Outlet>
        {/* page content hear */}
      </div>
      {/* navbar hear start*/}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-300 text-black min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <SwiftdropLogo></SwiftdropLogo>
          <div className="divider divider-primary"></div>
          <div className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/myParcels"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-black"
                }
              >
                <FaBox className="inline mr-2" size={20} /> My Parcels
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-black"
                }
              >
                <FaMoneyBillWave className="inline mr-2" size={20} /> Payment
                History
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/track"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-black"
                }
              >
                <FaSearchLocation className="inline mr-2" size={20} /> Track a
                Package
              </NavLink>
            </li>
            {/*  */}
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-black"
                }
              >
                <FaUserEdit className="inline mr-2" size={20} /> Update Profile
              </NavLink>
            </li>

            {/* role === 'riders' */}
            {roleLoading ? (
              <li className="py-2 text-center text-gray-500">Loading...</li>
            ) : (
              role === "rider" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/pending-deliveries"
                      className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                      }
                    >
                      <FaTasks className="inline mr-2" size={20} />
                      Pending Deleveries
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/completed-deliveries"
                      className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                      }
                    >
                      <FaCheckCircle className="inline mr-2" size={20} />
                      My Completed-Deliveries
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-earning"
                      className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                      }
                    >
                      <FaWallet className="inline mr-2" size={20} />
                      My Earning
                    </NavLink>
                  </li>
                </>
              )
            )}
            {/* role === 'admin' */}
            {roleLoading ? (
              <li className="py-2 text-center text-gray-500">Loading...</li>
            ) : (
              role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/active-riders"
                      className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                      }
                    >
                      <FaUserCheck className="inline mr-2" size={20} /> Active
                      Riders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/pending-riders"
                      className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                      }
                    >
                      <FaUserClock className="inline mr-2" size={20} /> Pending
                      Riders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/makeAdmin"
                      className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                      }
                    >
                      <FaUserShield className="inline mr-2" size={20} /> Make
                      Admin
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/assign-riders"
                      className={({ isActive }) =>
                        isActive ? "text-green-500" : "text-black"
                      }
                    >
                      <FaMotorcycle className="inline mr-2" size={20} /> Assign
                      Riders
                    </NavLink>
                  </li>
                </>
              )
            )}
          </div>
        </ul>
      </div>
      {/* navbar end */}
    </div>
  );
};
export default DashboardLayout;
