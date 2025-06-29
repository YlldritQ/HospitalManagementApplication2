"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import type { ILoginDto } from "../../types/auth.types";
import InputField from "../../components/general/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../../components/general/Button";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH_PUBLIC } from "../../routes/paths";
import { TbActivityHeartbeat } from "react-icons/tb";
import { getRedirectPathByRole } from "../../utils/globalConfig";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated && user?.roles) {
      navigate(getRedirectPathByRole(user.roles));
    }
  }, [isAuthenticated, user, navigate]);

  const loginSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmitLoginForm = async (data: ILoginDto) => {
    try {
      setLoading(true);
      await login(data.userName, data.password, rememberMe);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 401) {
        toast.error("Invalid Username or Password");
      } else {
        toast.error("An error occurred. Please contact admins");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] px-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-3">
              <TbActivityHeartbeat className="text-white w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome Back
            </h1>
            <p className="text-blue-100 text-xs">Sign in to continue</p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-6">
            <form
              onSubmit={handleSubmit(onSubmitLoginForm)}
              className="space-y-4"
            >
              <InputField
                control={control}
                label="Username"
                inputName="userName"
                icon="user"
                error={errors.userName?.message}
              />

              <InputField
                control={control}
                label="Password"
                inputName="password"
                inputType="password"
                icon="lock"
                error={errors.password?.message}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer text-gray-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <Link
                  to="#"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="light"
                  type="button"
                  label="Reset"
                  onClick={() => reset()}
                />
                <Button
                  variant="primary"
                  type="submit"
                  label="Sign In"
                  onClick={() => { }}
                  loading={loading}
                />
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <p className="text-sm text-gray-300">
                Don&apos;t have an account?{" "}
                <Link
                  to={PATH_PUBLIC.register}
                  className="font-semibold text-blue-400 hover:text-blue-300"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
