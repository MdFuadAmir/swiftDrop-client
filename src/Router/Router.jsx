import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";

export const router = createBrowserRouter([
    {
        path:'/',
        Component: RootLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: '/coverage',
                Component: Coverage
            },
            {
                path: '/forbidden',
                Component: Forbidden
            },
            {
                path: '/sendParcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
            },
            {
                path: '/beARider',
                element: <PrivateRoute><BeARider></BeARider></PrivateRoute>
            },
        ]
    },
    {
        path:'/',
        Component: AuthLayout,
        children:[
            {
                path:'login',
                Component: Login
            },
            {
                path:'signUp',
                Component: Register
            },
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'myParcels',
                Component: MyParcels
            },
            {
                path:'payment/:parcelId',
                Component: Payment
            },
            {
                path:'paymentHistory',
                Component: PaymentHistory
            },
            {
                path:'track',
                Component: TrackParcel
            },
            {
                path:'profile',
                Component: UpdateProfile
            },
            {
                path:'active-riders',
                element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>,
                // Component: ActiveRiders
            },
            {
                path:'pending-riders',
                element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>,
                // Component: PendingRiders
            },
            {
                path:'makeAdmin',
                element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>,
                // Component: MakeAdmin,
            },
            
        ]
    }
])