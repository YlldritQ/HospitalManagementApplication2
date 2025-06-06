import React, { useState, useEffect } from 'react';
import { CULectureDto, LecturerDto } from '../../types/testTypes';
import { getLecturers } from '../../services/testServices';

interface LectureCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (LectureDto: CULectureDto) => Promise<void>;
}

const LectureCreateModal: React.FC<LectureCreateModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [Lecturers, setLecturers] = useState<LecturerDto[]>([]);
  const [formData, setFormData] = useState<CULectureDto>({
    name: '',
    lecturerId: 0
  });

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const LecturerData = await getLecturers();
        setLecturers(LecturerData);
      } catch (error) {
        console.error('Failed to fetch Lecturers:', error);
      }
    };

    if (isOpen) {
      fetchLecturers();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Failed to create Lecture:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Create Lecture</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="Name" className="block text-sm font-medium text-gray-300">Lecture Name</label>
            <input
              id="Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="LecturerId" className="block text-sm font-medium text-gray-300">Lecturer</label>
            <select
              id="LecturerId"
              value={formData.lecturerId}
              onChange={(e) => setFormData({ ...formData, lecturerId: Number(e.target.value) })}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Lecturer</option>
              {Lecturers.map((Lecturer) => (
                <option key={Lecturer.lecturerId} value={Lecturer.lecturerId}>
                  {Lecturer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LectureCreateModal;
