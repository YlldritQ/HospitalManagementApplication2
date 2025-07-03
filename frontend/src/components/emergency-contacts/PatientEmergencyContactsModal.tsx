import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Star } from "lucide-react";
import { toast } from "react-hot-toast";
import Spinner from "../general/Spinner";

// Define interface locally to avoid import issues
interface IEmergencyContact {
  emergencyContactId: number;
  fullName: string;
  phoneNumber: string;
  relationship: string;
  isPrimary: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  patientName: string;
}

const PatientEmergencyContactsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  patientId,
  patientName,
}) => {
  const [contacts, setContacts] = useState<IEmergencyContact[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch patient's emergency contacts
  const fetchPatientContacts = async () => {
    if (!patientId) return;
    
    setLoading(true);
    try {
      const response = await axiosInstance.get<IEmergencyContact[]>(`/EmergencyContacts/user/${patientId}`);
      setContacts(response.data);
    } catch (error) {
      toast.error("Failed to load patient's emergency contacts.");
      console.error("Error fetching patient contacts:", error);
    }
    setLoading(false);
  };

  // Load contacts when modal opens
  useEffect(() => {
    if (isOpen && patientId) {
      fetchPatientContacts();
    }
  }, [isOpen, patientId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Emergency Contacts - {patientName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner />
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No emergency contacts found for this patient.</p>
              <p className="text-sm mt-2">The patient has not added any emergency contacts yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-gray-800">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Full Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone Number</th>
                    <th className="px-4 py-3 text-left font-semibold">Relationship</th>
                    <th className="px-4 py-3 text-center font-semibold">Primary</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.emergencyContactId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">{contact.fullName}</td>
                      <td className="px-4 py-3">{contact.phoneNumber}</td>
                      <td className="px-4 py-3">{contact.relationship}</td>
                      <td className="px-4 py-3 text-center">
                        {contact.isPrimary && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                            <Star className="w-3 h-3" /> Primary
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientEmergencyContactsModal;