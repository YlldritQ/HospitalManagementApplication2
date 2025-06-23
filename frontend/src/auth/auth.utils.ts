import { IAuthUser, RolesEnum } from '../types/auth.types';
import axiosInstance from "../utils/axiosInstance";

export const setSession = (accessToken: string | null, refreshToken?: string | null, rememberMe?: boolean) => {
  // Always store access token in sessionStorage
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    sessionStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }

  // Store refresh token based on rememberMe
  if (refreshToken) {
    if (rememberMe) {
      localStorage.setItem('refreshToken', refreshToken);
      sessionStorage.removeItem('refreshToken');
    } else {
      sessionStorage.setItem('refreshToken', refreshToken);
      localStorage.removeItem('refreshToken');
    }
  } else {
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('refreshToken');
  }
};

export const getSession = () => {
  return sessionStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
};

export const allAccessRoles = [RolesEnum.DOCTOR, RolesEnum.ADMIN, RolesEnum.NURSE, RolesEnum.PATIENT, RolesEnum.USER];
export const adminAccessRoles = [RolesEnum.ADMIN];
export const adminDoctorPatientRoles = [RolesEnum.DOCTOR, RolesEnum.ADMIN, RolesEnum.PATIENT];

export const allowedRolesForUpdateArray = (loggedInUser?: IAuthUser): string[] => {
  return loggedInUser?.roles.includes(RolesEnum.ADMIN)
    ? [RolesEnum.DOCTOR, RolesEnum.NURSE, RolesEnum.PATIENT, RolesEnum.USER]
    : [];
};

export const isAuthorizedForUpdateRole = (loggedInUserRole: string, selectedUserRole: string) => {
  let result = true;
  if (loggedInUserRole === RolesEnum.ADMIN && selectedUserRole === RolesEnum.ADMIN) {
    result = false;
  }
  
  return result;
};