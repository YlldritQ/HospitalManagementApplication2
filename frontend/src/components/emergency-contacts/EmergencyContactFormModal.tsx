import React, { useEffect } from "react";
import { IEmergencyContact } from "../../pages/dashboard/EmergencyContacts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<IEmergencyContact, "emergencyContactId">) => void;
  initialData: IEmergencyContact | null;
  isEdit: boolean;
  disablePrimary: boolean;
  disableAdd: boolean;
}

const defaultForm = {
  fullName: "",
  phoneNumber: "",
  relationship: "",
  isPrimary: false,
};

const EmergencyContactFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit,
  disablePrimary,
  disableAdd,
}) => {
  const [form, setForm] = React.useState(defaultForm);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName,
        phoneNumber: initialData.phoneNumber,
        relationship: initialData.relationship,
        isPrimary: initialData.isPrimary,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initialData, isOpen]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isEdit ? "Edit Contact" : "Add Emergency Contact"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              required
              maxLength={100}
              disabled={disableAdd && !isEdit}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              required
              maxLength={20}
              disabled={disableAdd && !isEdit}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Relationship</label>
            <input
              type="text"
              name="relationship"
              value={form.relationship}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              required
              maxLength={50}
              disabled={disableAdd && !isEdit}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPrimary"
              checked={form.isPrimary}
              onChange={handleChange}
              id="isPrimary"
            />
            <label htmlFor="isPrimary" className="text-gray-700 font-medium">
              Mark as Primary
            </label>
            {disablePrimary && !form.isPrimary && (
              <span className="text-xs text-yellow-600 ml-2">(Another contact is already primary. Saving will update the primary contact.)</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={disableAdd && !isEdit}
          >
            {isEdit ? "Update Contact" : "Add Contact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmergencyContactFormModal; 