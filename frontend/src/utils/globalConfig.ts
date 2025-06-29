import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/paths";

// URLS
export const HOST_API_KEY = "https://localhost:7058/api";
export const REGISTER_URL = "/Auth/register";
export const LOGIN_URL = "/Auth/login";
export const ME_URL = "/Auth/me";
export const USERS_LIST_URL = "/Auth/users";
export const UPDATE_ROLE_URL = "/Auth/update-role";
export const UPDATE_URL = `/Auth/update/`;
export const USERNAMES_LIST_URL = "/Auth/usernames";
export const LOGS_URL = "/Logs";
export const MY_LOGS_URL = "/Logs/mine";

// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGIN_PATIENT = PATH_DASHBOARD.user;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.login;

export const getRedirectPathByRole = (roles: string[]): string => {
  if (roles.includes("Patient")) return PATH_DASHBOARD.user;
  if (roles.includes("Doctor")) return PATH_DASHBOARD.doctor;
  if (roles.includes("Nurse")) return PATH_DASHBOARD.nurse;
  if (roles.includes("Admin")) return PATH_DASHBOARD.admin;
  return PATH_DASHBOARD.dashboard;
};
