import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../../components/general/Spinner";
import Button from "../../components/general/Button";
import EmergencyContactsTable from "../../components/emergency-contacts/EmergencyContactsTable";
import EmergencyContactFormModal from "../../components/emergency-contacts/EmergencyContactFormModal";
import DeleteConfirmationModal from "../../components/emergency-contacts/DeleteConfirmationModal";
import { toast } from "react-hot-toast";

// EmergencyContact type for frontend
export interface IEmergencyContact {
  emergencyContactId: number;
  fullName: string;
  phoneNumber: string;
  relationship: string;
  isPrimary: boolean;
}

const EmergencyContacts = () => {
  // State for contacts, loading, modals, and selected contact
  const [contacts, setContacts] = useState<IEmergencyContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IEmergencyContact | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  // Fetch contacts from API
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<IEmergencyContact[]>("/EmergencyContacts");
      setContacts(res.data);
    } catch (err) {
      toast.error("Failed to load emergency contacts.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Open add contact modal
  const handleAdd = () => {
    setSelectedContact(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  // Open edit contact modal
  const handleEdit = (contact: IEmergencyContact) => {
    setSelectedContact(contact);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  // Open delete confirmation modal
  const handleDelete = (contact: IEmergencyContact) => {
    setSelectedContact(contact);
    setIsDeleteOpen(true);
  };

  // Handle form submit (add or edit)
  const handleFormSubmit = async (data: Omit<IEmergencyContact, "emergencyContactId">) => {
    try {
      if (isEdit && selectedContact) {
        await axiosInstance.put(`/EmergencyContacts/${selectedContact.emergencyContactId}`, data);
        toast.success("Contact updated.");
      } else {
        await axiosInstance.post("/EmergencyContacts", data);
        toast.success("Contact added.");
      }
      setIsFormOpen(false);
      fetchContacts();
    } catch (err: any) {
      toast.error(err.response?.data || "Failed to save contact.");
    }
  };

  // Handle delete
  const handleDeleteConfirm = async () => {
    if (!selectedContact) return;
    try {
      await axiosInstance.delete(`/EmergencyContacts/${selectedContact.emergencyContactId}`);
      toast.success("Contact deleted.");
      setIsDeleteOpen(false);
      fetchContacts();
    } catch (err) {
      toast.error("Failed to delete contact.");
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Emergency Contacts</h1>
          <Button
            label="Add Contact"
            onClick={handleAdd}
            variant="primary"
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium"
            disabled={contacts.length >= 3}
          />
        </div>
        <EmergencyContactsTable
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <EmergencyContactFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedContact}
        isEdit={isEdit}
        disablePrimary={contacts.some(c => c.isPrimary) && !selectedContact?.isPrimary}
        disableAdd={contacts.length >= 3}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete "${selectedContact?.fullName}"?`}
      />
    </div>
  );
};

export default EmergencyContacts;
