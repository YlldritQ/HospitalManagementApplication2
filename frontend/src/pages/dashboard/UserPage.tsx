import { FaUserInjured, FaFileMedical, FaCalendarAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageAccessTemplate from '../../components/dashboard/page-access/PageAccessTemplate';

const UserPage = () => {
  return (
    <div className="min-h-screen w-full p-4 md:p-6">
      <PageAccessTemplate color="#FEC223" icon={FaUserInjured} role="Patient" />

      <div className="w-full max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Medical Records Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl border-t-4 border-l-4" style={{ borderColor: '#4A90E2' }}>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#4A90E2]">
                <FaFileMedical className="mr-3 text-3xl" /> My Medical Records
              </h2>
              <p className="text-gray-300 mb-4">
                View and access your medical records securely and confidentially.
              </p>
              <Link
                to="/dashboard/medicalRecord-list"
                className="inline-block text-white bg-[#4A90E2] hover:bg-[#357ABD] py-2 px-4 rounded-lg transition-colors duration-200"
              >
                View Records
              </Link>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl border-t-4 border-l-4" style={{ borderColor: '#50E3C2' }}>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#50E3C2]">
                <FaCalendarAlt className="mr-3 text-3xl" /> My Appointments
              </h2>
              <p className="text-gray-300 mb-4">
                Check your upcoming appointments and schedule new ones.
              </p>
              <Link
                to="/dashboard/appointment"
                className="inline-block text-white bg-[#50E3C2] hover:bg-[#3D8B74] py-2 px-4 rounded-lg transition-colors duration-200"
              >
                View Appointments
              </Link>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl border-t-4 border-l-4" style={{ borderColor: '#FF6B6B' }}>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#FF6B6B]">
                <FaPhone className="mr-3 text-3xl" /> Emergency Contacts
              </h2>
              <p className="text-gray-300 mb-4">
                Manage your emergency contacts for quick access during emergencies.
              </p>
              <Link
                to="/dashboard/emergency-contacts"
                className="inline-block text-white bg-[#FF6B6B] hover:bg-[#E55A5A] py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Manage Contacts
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserPage;
