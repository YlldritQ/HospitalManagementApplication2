"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import type { IRegisterDto } from "../../types/auth.types";
import InputField from "../../components/general/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../../components/general/Button";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/paths";
import { GenderEnum } from "../../types/auth.types";
import { TbActivityHeartbeat } from "react-icons/tb";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(PATH_DASHBOARD.dashboard);
  }, [isAuthenticated, navigate]);

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
    address: Yup.string().required("Address is required"),
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
      await register(
        data.firstName,
        data.lastName,
        data.userName,
        data.email,
        data.gender,
        data.password,
        data.address
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status, data: message } = err;
      if (status === 400 || status === 409) {
        toast.error(message);
      } else {
        toast.error("An error occurred. Please contact admins");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] px-4 py-4">
      <div className="w-full max-w-5xl">
        {/* Card Container */}
        <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-3">
              <TbActivityHeartbeat className="text-white w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-blue-100 text-xs">Join us in minutes</p>
          </div>

          {/* Form */}
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit(onSubmitRegisterForm)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
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
                  label="Username"
                  inputName="userName"
                  error={errors.userName?.message}
                />
                <InputField
                  control={control}
                  label="Email Address"
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
                <div className="md:col-span-2 lg:col-span-3">
                  <InputField
                    control={control}
                    label="Address"
                    inputName="address"
                    error={errors.address?.message}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t border-white/10 pt-6 mt-6">
                <Button
                  className="w-full sm:w-auto flex-1"
                  variant="light"
                  type="button"
                  label="Reset Form"
                  onClick={() => reset()}
                />
                <Button
                  className="w-full sm:w-auto flex-1"
                  variant="primary"
                  type="submit"
                  label="Create Account"
                  loading={loading}
                  onClick={() => { }}
                />
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <Link
                  to={PATH_PUBLIC.login}
                  className="font-semibold text-blue-400 hover:text-blue-200"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
