import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserMinus, FaUserShield } from "react-icons/fa";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Handle make admin
  const handleMakeAdmin = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove Admin" : "Make Admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if (!confirm.isConfirmed) return;
    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${action} successfull`, "Success");
    } catch (error) {
      Swal.fire("Error", "Failed to update user role", error);
    }
  };

  return (
    <div className="p-4 md:p-12">
      <h2 className="text-2xl font-bold mb-4 text-center underline">
        Make Admin
      </h2>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by email..."
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Email</th>
              <th>Created At</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        user.role === "admin" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user.role)}
                        className="btn btn-sm btn-error flex items-center gap-2"
                      >
                        <FaUserMinus /> Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user.role)}
                        className="btn btn-sm btn-success flex items-center gap-2"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-red-500">
                  No user found 😥
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
