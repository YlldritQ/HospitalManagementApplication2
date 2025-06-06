import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getLecturerByID, createLecturer, updateLecturer } from '../../services/testServices';
import { CULecturerDto } from '../../types/testTypes';

interface LecturerModalProps {
    isOpen: boolean;
    onClose: () => void;
    LecturerId: number;
}

const LecturerModal: React.FC<LecturerModalProps> = ({ isOpen, onClose, LecturerId }) => {
    const [Lecturer, setLecturer] = useState<CULecturerDto | null>(null);
    const [name, setName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');

    useEffect(() => {
        if (LecturerId > 0) {
            setMode('edit');
            const fetchLecturer = async () => {
                setLoading(true);
                try {
                    const data = await getLecturerByID(LecturerId);
                    if (data) {
                        setLecturer(data);
                        setName(data.name);
                        setDepartment(data.department);
                        setEmail(data.email);
                    }
                } catch (err) {
                    toast.error('Failed to fetch Lecturer');
                } finally {
                    setLoading(false);
                }
            };
            fetchLecturer();
        } else {
            setMode('create');
            setName('');
        }
    }, [LecturerId, isOpen]);

    const handleSubmit = async () => {
        try {
            if (mode === 'create') {
                await createLecturer({name, department , email});
                toast.success('Lecturer created successfully');
            } else {
                if (Lecturer) {
                    await updateLecturer(LecturerId, { ...Lecturer, name });
                    toast.success('Lecturer updated successfully');
                }
            }
            onClose();
        } catch (err) {
            toast.error('Failed to save Lecturer');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="mt-10 w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {mode === 'create' ? 'Add Lecturer' : 'Edit Lecturer'}
            </h2>
      
            {loading ? (
              <div className="text-center text-gray-300">Loading...</div>
            ) : (
              <div>
                <div className="mb-6">
                  <label htmlFor="Lecturer-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    id="Lecturer-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Lecturer name"
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>      
                <div className="mb-6">
                  <label htmlFor="Lecturer-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <input
                    id="Lecturer-name"
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Enter Lecturer name"
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>      
                <div className="mb-6">
                  <label htmlFor="Lecturer-name" className="block text-sm font-medium text-gray-300 mb-2">
                    isDeleted
                  </label>
                  <input
                    id="Lecturer-name"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Lecturer name"
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>      
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={onClose}
                    className="py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className={`py-3 px-4 font-semibold rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      mode === 'create'
                        ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'
                        : 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white'
                    }`}
                  >
                    {mode === 'create' ? 'Create' : 'Save'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
      
};

export default LecturerModal;
