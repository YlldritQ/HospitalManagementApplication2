"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { USERS_LIST_URL } from "../../utils/globalConfig";
import type { IAuthUser } from "../../types/auth.types";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import Button from "../../components/general/Button";
import AddUserModal from "../../components/modals/AddUserModal";
import LatestUsersSection from "../../components/dashboard/users-management/LatestUsersSection";
import UserChartSection from "../../components/dashboard/users-management/UserChartSection";
import UserCountSection from "../../components/dashboard/users-management/UserCountSection";
import UsersTableSection from "../../components/dashboard/users-management/UsersTableSection";

const UsersManagementPage = () => {
  const [users, setUsers] = useState<IAuthUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const getUsersList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("An error happened. Please contact admins.");
      setLoading(false);
    }
  };

  const handleUserAdded = () => {
    getUsersList();
    toast.success("User added successfully! Users list refreshed.");
  };

  useEffect(() => {
    getUsersList();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Users Management</h1>
        <Button
          label="+ Add New User"
          onClick={() => setIsAddUserModalOpen(true)}
          variant="primary"
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        />
      </div>

      <UserCountSection usersList={users} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <UserChartSection usersList={users} />
        <LatestUsersSection usersList={users} />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">All Users</h2>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
          <UsersTableSection usersList={users} />
        </div>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
};

export default UsersManagementPage;
