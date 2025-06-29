"use client"

import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { USERS_LIST_URL } from "../../utils/globalConfig"
import type { IAuthUser } from "../../types/auth.types"
import { toast } from "react-hot-toast"
import Spinner from "../../components/general/Spinner"
import Button from "../../components/general/Button"
import AddUserModal from "../../components/modals/AddUserModal"
import LatestUsersSection from "../../components/dashboard/users-management/LatestUsersSection"
import UserChartSection from "../../components/dashboard/users-management/UserChartSection"
import UserCountSection from "../../components/dashboard/users-management/UserCountSection"
import UsersTableSection from "../../components/dashboard/users-management/UsersTableSection"

const UsersManagementPage = () => {
  const [users, setUsers] = useState<IAuthUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)

  const getUsersList = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL)
      const { data } = response
      setUsers(data)
      setLoading(false)
    } catch (error) {
      toast.error("An Error happened. Please Contact admins")
      setLoading(false)
    }
  }

  const handleUserAdded = () => {
    // Refresh the users list after adding a new user
    getUsersList()
    toast.success("User added successfully! Users list refreshed.")
  }

  useEffect(() => {
    getUsersList()
  }, [])

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="pageTemplate2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>

      <UserCountSection usersList={users} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4">
        <UserChartSection usersList={users} />
        <LatestUsersSection usersList={users} />
      </div>

      {/* Users Table Section with Add User Button */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Users</h2>
          <Button
            label="+ Add New User"
            onClick={() => setIsAddUserModalOpen(true)}
            variant="primary"
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          />
        </div>
        <UsersTableSection usersList={users} />
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onUserAdded={handleUserAdded}
      />
    </div>
  )
}

export default UsersManagementPage
