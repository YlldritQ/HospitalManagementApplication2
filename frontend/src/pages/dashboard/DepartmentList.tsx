"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { DepartmentDto } from "../../types/departmentTypes";
import DepartmentModal from "../../components/modals/DepartmentModal";
import ManageDepartmentModal from "../../components/modals/ManageDepartmentModal";
import { getDepartments, deleteDepartment } from "../../services/departmentService";
import { Building2 } from "lucide-react";
import SearchFilter from "../../components/general/SearchFilter";

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<DepartmentDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"assign" | "remove" | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
        setFilteredDepartments(data);
      } catch (err) {
        setError("Failed to fetch departments");
        toast.error("Failed to fetch departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Filter departments based on search term
  useEffect(() => {
    let filtered = departments;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(department =>
        department.name.toLowerCase().includes(term) ||
        department.description.toLowerCase().includes(term) ||
        department.id.toString().includes(term)
      );
    }

    setFilteredDepartments(filtered);
  }, [departments, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this department?")) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteDepartment(id);
      setDepartments(departments.filter((d) => d.id !== id));
      toast.success("Department deleted successfully");
    } catch (err) {
      toast.error("Failed to delete department");
    } finally {
      setDeletingId(null);
    }
  };

  const handleButtonClick = (id: number) => {
    navigate(`/dashboard/edit-department/${id}`);
  };

  const handleAddDepartmentClick = () => {
    setSelectedDepartment(null);
    setIsModalOpen(true);
  };

  const handleManageClick = (id: number) => {
    setSelectedDepartment(id);
    setIsManageModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsManageModalOpen(false);
    setActionType(null);
  };

  const handleActionSelect = (action: "assign" | "remove") => {
    setActionType(action);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading departments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/20">
              <Building2 className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">Department Management</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Manage and organize your hospital departments
          </p>
        </div>

        {/* Add Department Button */}
        <div className="mb-8">
          <button
            onClick={handleAddDepartmentClick}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            + Add New Department
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <SearchFilter
            onSearch={handleSearch}
            placeholder="Search departments by name, description, or ID..."
          />
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-400">
          Showing {filteredDepartments.length} of {departments.length} departments
        </div>

        {/* Departments Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {filteredDepartments.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                {searchTerm ? 'No departments found matching your search' : 'No departments found'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first department.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleAddDepartmentClick}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  + Create Department
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredDepartments.map((department) => (
                    <tr
                      key={department.id}
                      className="hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-gray-300">#{department.id}</td>
                      <td className="px-6 py-4 text-white font-medium">
                        {department.name}
                      </td>
                      <td className="px-6 py-4 text-gray-300 max-w-xs truncate">
                        {department.description}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleButtonClick(department.id)}
                            className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleManageClick(department.id)}
                            className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors duration-200"
                          >
                            Manage
                          </button>
                          <button
                            onClick={() => handleDelete(department.id)}
                            disabled={deletingId === department.id}
                            className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingId === department.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <DepartmentModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          departmentId={selectedDepartment ?? 0}
        />
      )}

      {isManageModalOpen && selectedDepartment && (
        <ManageDepartmentModal
          isOpen={isManageModalOpen}
          onClose={handleModalClose}
          departmentId={selectedDepartment}
          actionType={actionType}
          onActionSelect={handleActionSelect}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default DepartmentList;
