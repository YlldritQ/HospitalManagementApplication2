"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { getUnassignedRoomsForDoctorsByDepartment } from "../../services/roomService"
import type { RoomDto } from "../../types/roomTypes"
import { toast } from "react-hot-toast"
import type { DoctorRoomManagementDto } from "../../types/doctorTypes"
import { getRoomsAssignedToDoctor } from "../../services/doctorService"

interface RoomAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  doctorId: number
  departmentId: number
  onAssign: (dto: DoctorRoomManagementDto) => void
  onRemove: (dto: DoctorRoomManagementDto) => void
}

const RoomAssignmentModal: React.FC<RoomAssignmentModalProps> = ({
  isOpen,
  onClose,
  doctorId,
  departmentId,
  onAssign,
  onRemove,
}) => {
  const [unassignedRooms, setUnassignedRooms] = useState<RoomDto[]>([])
  const [assignedRooms, setAssignedRooms] = useState<RoomDto[]>([])
  const [selectedAssignRoomIds, setSelectedAssignRoomIds] = useState<number[]>([])
  const [selectedRemoveRoomIds, setSelectedRemoveRoomIds] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [mode, setMode] = useState<"assign" | "remove">("assign")

  useEffect(() => {
    if (isOpen) {
      const fetchRooms = async () => {
        setLoading(true)
        try {
          const unassignedData = await getUnassignedRoomsForDoctorsByDepartment(departmentId)
          setUnassignedRooms(unassignedData)
          const assignedData = await getRoomsAssignedToDoctor(doctorId)
          setAssignedRooms(assignedData)
        } catch (err) {
          toast.error("Failed to fetch rooms")
        } finally {
          setLoading(false)
        }
      }
      fetchRooms()
    }
  }, [isOpen, doctorId, departmentId])

  const handleRoomToggleAssign = (roomId: number) => {
    setSelectedAssignRoomIds((prevIds) =>
      prevIds.includes(roomId) ? prevIds.filter((id) => id !== roomId) : [...prevIds, roomId],
    )
  }

  const handleRoomToggleRemove = (roomId: number) => {
    setSelectedRemoveRoomIds((prevIds) =>
      prevIds.includes(roomId) ? prevIds.filter((id) => id !== roomId) : [...prevIds, roomId],
    )
  }

  const handleSubmit = () => {
    if (mode === "assign" && selectedAssignRoomIds.length === 0) {
      toast.error("Please select at least one room to assign")
      return
    }
    if (mode === "remove" && selectedRemoveRoomIds.length === 0) {
      toast.error("Please select at least one room to remove")
      return
    }

    if (mode === "assign") {
      onAssign({ doctorId, roomIds: selectedAssignRoomIds })
    } else if (mode === "remove") {
      onRemove({ doctorId, roomIds: selectedRemoveRoomIds })
    }

    // Reset selections
    setSelectedAssignRoomIds([])
    setSelectedRemoveRoomIds([])
    onClose()
  }

  const handleClose = () => {
    setSelectedAssignRoomIds([])
    setSelectedRemoveRoomIds([])
    onClose()
  }

  if (!isOpen) return null

  const currentRooms = mode === "assign" ? unassignedRooms : assignedRooms
  const selectedRoomIds = mode === "assign" ? selectedAssignRoomIds : selectedRemoveRoomIds
  const handleRoomToggle = mode === "assign" ? handleRoomToggleAssign : handleRoomToggleRemove

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 z-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Room Management</h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20"
            >
              ×
            </button>
          </div>
          <p className="text-blue-100 mt-1">Manage room assignments for doctor</p>
        </div>

        {/* Mode Toggle */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex bg-white rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setMode("assign")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${mode === "assign"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              Assign Rooms
            </button>
            <button
              onClick={() => setMode("remove")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${mode === "remove"
                ? "bg-red-600 text-white shadow-md"
                : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                }`}
            >
              Remove Rooms
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-96">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading rooms...</p>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {mode === "assign" ? "Available Rooms to Assign" : "Assigned Rooms to Remove"}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({currentRooms.length} {currentRooms.length === 1 ? "room" : "rooms"})
                  </span>
                </h3>

                {currentRooms.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">
                      {mode === "assign" ? "No rooms available to assign" : "No rooms currently assigned"}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {mode === "assign"
                        ? "All rooms in this department are already assigned"
                        : "This doctor has no room assignments"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentRooms.map((room) => (
                      <div
                        key={room.id}
                        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedRoomIds.includes(room.id)
                          ? mode === "assign"
                            ? "border-blue-500 bg-blue-50"
                            : "border-red-500 bg-red-50"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                          }`}
                        onClick={() => handleRoomToggle(room.id)}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${mode}-room-${room.id}`}
                            checked={selectedRoomIds.includes(room.id)}
                            onChange={() => handleRoomToggle(room.id)}
                            className={`w-5 h-5 rounded border-2 mr-3 ${mode === "assign"
                              ? "text-blue-600 focus:ring-blue-500 border-blue-300"
                              : "text-red-600 focus:ring-red-500 border-red-300"
                              }`}
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">Room {room.roomNumber || room.id}</div>
                          </div>
                        </div>
                        {selectedRoomIds.includes(room.id) && (
                          <div
                            className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${mode === "assign" ? "bg-blue-600" : "bg-red-600"
                              }`}
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-sm text-gray-600">
              {selectedRoomIds.length > 0 && (
                <span>
                  {selectedRoomIds.length} room{selectedRoomIds.length !== 1 ? "s" : ""} selected
                </span>
              )}
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={handleClose}
                className="flex-1 sm:flex-none py-2 px-6 bg-gray-500 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedRoomIds.length === 0}
                className={`flex-1 sm:flex-none py-2 px-6 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${mode === "assign"
                  ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                  : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                  }`}
              >
                {mode === "assign" ? "Assign Rooms" : "Remove Rooms"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomAssignmentModal
