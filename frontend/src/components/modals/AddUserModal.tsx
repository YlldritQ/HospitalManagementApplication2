"use client";

import type React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { TbActivityHeartbeat } from "react-icons/tb";
import InputField from "../general/InputField";
import Button from "../general/Button";
import axiosInstance from "../../utils/axiosInstance";
import { type IRegisterDto, GenderEnum } from "../../types/auth.types";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded?: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onUserAdded,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("User Name is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Input text must be a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    address: Yup.string().required("Address Is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterDto>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      gender: "",
      email: "",
      password: "",
      address: "",
    },
  });

  const onSubmitRegisterForm = async (data: IRegisterDto) => {
    try {
      setLoading(true);

      await axiosInstance.post("/Auth/register", data);

      setLoading(false);
      toast.success("User registered successfully!");
      reset();
      onClose();
      if (onUserAdded) onUserAdded();
    } catch (error) {
      setLoading(false);
      const err = error as { response?: { data: string; status: number } };
      const { status, data: message } = err.response || {};
      if (status === 400 || status === 409) {
        toast.error(message || "Invalid input");
      } else {
        toast.error("An error occurred. Please contact admins.");
      }
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white w-12 h-12 flex justify-center items-center rounded-full mr-4">
              <TbActivityHeartbeat className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-blue-800">Add New User</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Register Form */}
        <form
          onSubmit={handleSubmit(onSubmitRegisterForm)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <InputField
            control={control}
            label="First Name"
            inputName="firstName"
            error={errors.firstName?.message}
          />
          <InputField
            control={control}
            label="Last Name"
            inputName="lastName"
            error={errors.lastName?.message}
          />
          <InputField
            control={control}
            label="User Name"
            inputName="userName"
            error={errors.userName?.message}
          />
          <InputField
            control={control}
            label="Email"
            inputName="email"
            error={errors.email?.message}
          />
          <InputField
            control={control}
            label="Password"
            inputName="password"
            inputType="password"
            error={errors.password?.message}
          />
          <InputField
            control={control}
            label="Gender"
            inputName="gender"
            error={errors.gender?.message}
            isSelect={true}
            options={[
              { value: GenderEnum.MALE, label: "Male" },
              { value: GenderEnum.FEMALE, label: "Female" },
            ]}
          />
          <div className="md:col-span-2">
            <InputField
              control={control}
              label="Address"
              inputName="address"
              error={errors.address?.message}
            />
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <Button
              variant="secondary"
              type="button"
              label="Reset"
              onClick={() => reset()}
            />
            <Button
              variant="secondary"
              type="button"
              label="Cancel"
              onClick={handleClose}
            />
            <Button
              variant="primary"
              type="submit"
              label="Add User"
              loading={loading}
              onClick={() => { }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
