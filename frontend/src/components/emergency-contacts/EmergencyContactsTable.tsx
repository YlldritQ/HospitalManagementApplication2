import React from "react";
import { IEmergencyContact } from "../../pages/dashboard/EmergencyContacts";
import { Pencil, Trash2, Star } from "lucide-react";

interface Props {
  contacts: IEmergencyContact[];
  onEdit: (contact: IEmergencyContact) => void;
  onDelete: (contact: IEmergencyContact) => void;
}

const EmergencyContactsTable: React.FC<Props> = ({ contacts, onEdit, onDelete }) => {
  if (contacts.length === 0) {
    return <div className="text-white text-center py-8">No emergency contacts found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white/10 backdrop-blur p-4">
      <table className="min-w-full text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Relationship</th>
            <th className="px-4 py-2 text-center">Primary</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.emergencyContactId} className="border-t border-white/10 hover:bg-white/5">
              <td className="px-4 py-2">{contact.fullName}</td>
              <td className="px-4 py-2">{contact.phoneNumber}</td>
              <td className="px-4 py-2">{contact.relationship}</td>
              <td className="px-4 py-2 text-center">
                {contact.isPrimary && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-xs font-semibold">
                    <Star className="w-4 h-4 inline" /> Primary
                  </span>
                )}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  className="inline-flex items-center px-2 py-1 text-blue-400 hover:text-blue-600"
                  onClick={() => onEdit(contact)}
                  title="Edit"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  className="inline-flex items-center px-2 py-1 text-red-400 hover:text-red-600"
                  onClick={() => onDelete(contact)}
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmergencyContactsTable; 