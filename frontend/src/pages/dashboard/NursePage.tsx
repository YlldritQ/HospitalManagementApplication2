import React, { useEffect, useState } from 'react';
import PageAccessTemplate from '../../components/dashboard/page-access/PageAccessTemplate';
import { FaUserNurse, FaListUl, FaBed, FaFileMedical } from 'react-icons/fa';
import Button from '../../components/general/Button';
import { useNavigate } from 'react-router-dom';
import { getNurseByUserId, getRoomsAssignedToNurse } from '../../services/nurseService';
import { RoomDto } from '../../types/roomTypes';
import useAuth from '../../hooks/useAuth.hook';

const NursePage: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user: loggedInUser } = useAuth();
  const userId = loggedInUser?.id;

  useEffect(() => {
    const fetchNurseAndRooms = async () => {
      try {
        const nurseData = await getNurseByUserId(userId);
        if (nurseData !== null) {
          const nurse = nurseData;
          const assignedRooms = await getRoomsAssignedToNurse(nurse.id);
          setRooms(assignedRooms);
        } else {
          setError('Nurse not found');
        }
      } catch (err) {
        console.error("Error fetching nurse or rooms:", err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchNurseAndRooms();
  }, [userId]);

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return <div className="text-gray-300 text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center p-8">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full p-6">
      <PageAccessTemplate color='#3b3549' icon={FaUserNurse} role='Nurse' />

      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Patients List Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl border-t-4 border-l-4" style={{ borderColor: '#4A90E2' }}>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#4A90E2]">
                <FaListUl className="mr-3 text-3xl" /> Patient List
              </h2>
              <p className="text-gray-300 mb-4">
                View and manage patients assigned to you.
              </p>
              <Button
                label="View Patients"
                onClick={() => handleButtonClick('/dashboard/patient-list')}
                variant="primary"
                type="button"
                className="text-white bg-[#4A90E2] hover:bg-[#357ABD]"
              />
            </div>
          </div>

          {/* Medical Records Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl border-t-4 border-l-4" style={{ borderColor: '#D0021B' }}>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#D0021B]">
                <FaFileMedical className="mr-3 text-3xl" /> Medical Records
              </h2>
              <p className="text-gray-300 mb-4">
                Access and review patient medical records with ease and confidentiality.
              </p>
              <Button
                label="View Records"
                onClick={() => handleButtonClick('/dashboard/medicalRecord-list')}
                variant="primary"
                type="button"
                className="text-white bg-[#D0021B] hover:bg-[#B72D1F]"
              />
            </div>
          </div>

          {/* Assigned Rooms Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl border-t-4 border-l-4" style={{ borderColor: '#7D3F5C' }}>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#7D3F5C]">
                <FaBed className="mr-3 text-3xl" /> Assigned Rooms
              </h2>
              {rooms.length > 0 ? (
                <ul className="list-disc pl-6 text-gray-300">
                  {rooms.map(room => (
                    <li key={room.id} className="mb-2">
                      Room {room.roomNumber} (ID: {room.id})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No rooms assigned.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NursePage;
