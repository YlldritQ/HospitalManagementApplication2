import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getLecturerByID, updateLecturer } from '../../services/testServices';
import { CULecturerDto, LecturerDto } from '../../types/testTypes';

const EditLecturer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Lecturer, setLecturer] = useState<LecturerDto | null>(null);
    const [name, setName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLecturer = async () => {
            try {
                const data = await getLecturerByID(Number(id));
                if (data) {
                    setLecturer(data);
                    setName(data.name);
                    setDepartment(data.department);
                    setEmail(data.email);
                } else {
                    setError('Lecturer not found');
                }
            } catch (err) {
                setError('Failed to fetch Lecturer');
                toast.error('Failed to fetch Lecturer');
            } finally {
                setLoading(false);
            }
        };

        fetchLecturer();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (Lecturer) {
                const updatedLecturer: CULecturerDto = { // Correct type here
                    name,
                    department,
                    email
                };
                await updateLecturer(Lecturer.lecturerId, updatedLecturer); // Update function needs id and full Lecturer object
                toast.success('Lecturer updated successfully');
                navigate('/dashboard/Lecturer-list'); // Redirect to the Lecturer list
            }
        } catch (err) {
            toast.error('Failed to update Lecturer');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
          <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Edit Lecturer</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Lecturer name"
                  title="Lecturer name"
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-300 mb-1">
                  Department
                </label>
                <input
                  id="name"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Enter Lecturer name"
                  title="Lecturer name"
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="name"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Lecturer name"
                  title="Lecturer name"
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-1/2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/Lecturer-list')}
                  className="w-1/2 py-3 px-4 ml-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
      
};

export default EditLecturer;


