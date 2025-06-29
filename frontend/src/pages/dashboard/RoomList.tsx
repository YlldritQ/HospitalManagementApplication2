"use client";

import React from "react";
import { useEffect, useState } from "react";
import { getAllRooms, deleteRoom, updateRoom, createRoom } from "../../services/roomService";
import { RoomDto, CURoomDto } from "../../types/roomTypes";
import { toast, Toaster } from "react-hot-toast";
import RoomEditModal from "../../components/modals/RoomEditModal";
import { DepartmentDto } from "../../types/departmentTypes";
import { getDepartments } from "../../services/departmentService";
import useAuth from "../../hooks/useAuth.hook";
import { DoorOpen } from "lucide-react";

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomDto | null>(null);
  const { user: loggedInUser } = useAuth();
  const roles = loggedInUser?.roles;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
        const depData = await getDepartments();
        setDepartments(depData);
      } catch (err) {
        setError("Failed to fetch rooms");
        toast.error("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this room?")) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteRoom(id);
      setRooms(rooms.filter((room) => room.id !== id));
      toast.success("Room deleted successfully");
    } catch (err) {
      toast.error("Failed to delete room");
    } finally {
      setDeletingId(null);
    }
  };

  const findDepartmentName = (departmentId: number) => {
    const department = departments.find((p) => p.id === departmentId);
    return department ? `${department.name}` : "Unknown department";
  };

  const openEditModal = (room: RoomDto) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleUpdate = async (roomDto: CURoomDto) => {
    if (selectedRoom) {
      try {
        await updateRoom(selectedRoom.id, roomDto);
        setRooms(rooms.map((room) => (room.id === selectedRoom.id ? { ...room, ...roomDto } : room)));
        toast.success("Room updated successfully");
        setModalOpen(false);
      } catch (err) {
        toast.error("Failed to update room");
      }
    }
  };

  const handleCreate = async (roomDto: CURoomDto) => {
    try {
      const newRoom = await createRoom(roomDto);
      setRooms([...rooms, newRoom]);
      toast.success("Room created successfully");
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to create room");
    }
  };

  const isAdmin = roles?.includes("Admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/20">
              <DoorOpen className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">Room Management</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Monitor and manage hospital rooms and their availability
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Button Section */}
        {isAdmin && (
          <div className="mb-8">
            <button
              onClick={() => {
                setSelectedRoom(null);
                setModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              + Add New Room
            </button>
          </div>
        )}

        {/* Table Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-gray-300">Loading rooms...</div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No rooms found</h3>
              <p className="text-gray-500">
                No rooms have been created yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">Room Number</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">Department</th>
                    {isAdmin && (
                      <th className="px-6 py-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-gray-300">{room.id}</td>
                      <td className="px-6 py-4 text-gray-300">Room {room.roomNumber}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${room.isOccupied
                              ? "bg-red-600/20 text-red-400"
                              : "bg-green-600/20 text-green-400"
                            }`}
                        >
                          {room.isOccupied ? "Occupied" : "Available"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {findDepartmentName(room.departmentId)}
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditModal(room)}
                              className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(room.id)}
                              disabled={deletingId === room.id}
                              className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors duration-200 disabled:opacity-50"
                            >
                              {deletingId === room.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Toaster position="top-right" />

      {modalOpen && (
        <RoomEditModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          room={selectedRoom}
          onUpdate={handleUpdate}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
};

export default RoomList;
