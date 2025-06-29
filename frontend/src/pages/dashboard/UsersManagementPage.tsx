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
import { UserPlus } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] p-6">
      <div className="w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/20">
              <UserPlus className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Users Management
            </h1>
          </div>
          <Button
            label="+ Add New User"
            onClick={() => setIsAddUserModalOpen(true)}
            variant="primary"
            type="button"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          />
        </div>

        <UserCountSection usersList={users} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          <UserChartSection usersList={users} />
          <LatestUsersSection usersList={users} />
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white">
              All Users
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
            <UsersTableSection usersList={users} />
          </div>
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
