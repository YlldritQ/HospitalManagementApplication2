import {
  ReactNode,
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import {
  IAuthContext,
  IAuthContextAction,
  IAuthContextActionTypes,
  IAuthContextState,
  ILoginResponseDto,
} from "../types/auth.types";
import { getSession, setSession, getRefreshToken } from "./auth.utils";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGOUT,
  PATH_AFTER_REGISTER,
  REGISTER_URL,
  UPDATE_URL,
  getRedirectPathByRole
} from "../utils/globalConfig";

// reducer function for useReducer hook
const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
  if (action.type === IAuthContextActionTypes.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      isAuthLoading: false,
      user: action.payload,
    };
  }
  if (action.type === IAuthContextActionTypes.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isAuthLoading: false,
      user: undefined,
    };
  }
  return state;
};

//initial state object for useReducer hook
const initialAuthState: IAuthContextState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

// context and export 
export const AuthContext = createContext<IAuthContext | null>(null);

// interface for  context props
interface IProps {
  children: ReactNode;
}

// component to manage all auth functionalities and export
const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  // Initialize Method
  const initializeAuthContext = useCallback(async () => {
    try {
      let token = getSession();
      let refreshToken = getRefreshToken();
      // Determine rememberMe based on where the refresh token is stored
      let rememberMe = !!localStorage.getItem('refreshToken');
      if (token) {
        // validate accessToken by calling backend
        const response = await axiosInstance.post<ILoginResponseDto>(ME_URL, {
          token,
        });
        const { newToken, userInfo, refreshToken: newRefreshToken } = response.data;
        setSession(newToken, newRefreshToken, rememberMe);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });
      } else if (refreshToken) {
        // Always try to refresh if refreshToken exists (even in new tab)
        try {
          const response = await axiosInstance.post<ILoginResponseDto>(
            "/Auth/refresh-token",
            JSON.stringify(refreshToken),
            { headers: { "Content-Type": "application/json" } }
          );
          const { newToken, userInfo, refreshToken: newRefreshToken } = response.data;
          setSession(newToken, newRefreshToken, rememberMe);
          dispatch({
            type: IAuthContextActionTypes.LOGIN,
            payload: userInfo,
          });
        } catch (refreshError) {
          setSession(null);
          dispatch({
            type: IAuthContextActionTypes.LOGOUT,
          });
        }
      } else {
        setSession(null);
        dispatch({
          type: IAuthContextActionTypes.LOGOUT,
        });
      }
    } catch (error) {
      setSession(null);
      dispatch({
        type: IAuthContextActionTypes.LOGOUT,
      });
    }
  }, []);

  // In start of Application, We call initializeAuthContext to be sure about authentication status
  useEffect(() => {
    console.log("AuthContext Initialization start");
    initializeAuthContext()
      .then(() => console.log("initializeAuthContext was successfull"))
      .catch((error) => console.log(error));
  }, []);

  // Register Method
  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      userName: string,
      email: string,
      gender: string,
      password: string,
      address: string
    ) => {
      const response = await axiosInstance.post(REGISTER_URL, {
        firstName,
        lastName,
        userName,
        email,
        gender,
        password,
        address,
      });
      console.log("Register Result:", response);
      toast.success("Register Was Successfull. Please Login.");
      navigate(PATH_AFTER_REGISTER);
    },
    []
  );

  const update = useCallback(
    async (
      id: string,
      userName: string,
      email: string,
      password: string,
      address: string,
    ) => {
      try {
        // Send the update request
        const response = await axiosInstance.put(`${UPDATE_URL}${id}`, {
          userName,
          email,
          password,
          address,
        });
        toast.success("Update Successful");

        const { newToken, userInfo } = response.data;

        // Update session and context
        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });
        // Navigate after a short delay to ensure the state is updated
        navigate("/dashboard/profile");
      } catch (error) {
        console.error("Update Error:", error);
        toast.error("Update Failed. Please try again.");
      }
    },
    []
  );



  // Login Method
  const login = useCallback(async (userName: string, password: string, rememberMe: boolean) => {
    const response = await axiosInstance.post<ILoginResponseDto>(LOGIN_URL, {
      userName,
      password,
      rememberMe,
    });
    toast.success("Login Was Successful");
    const { newToken, userInfo, refreshToken } = response.data;
    if (rememberMe && refreshToken) {
      setSession(newToken, refreshToken, true);
    } else {
      setSession(newToken, null, false);
    }
    dispatch({
      type: IAuthContextActionTypes.LOGIN,
      payload: userInfo,
    });
    navigate(getRedirectPathByRole(userInfo.roles));
  }, []);

  // Logout Method
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: IAuthContextActionTypes.LOGOUT,
    });
    navigate(PATH_AFTER_LOGOUT);
  }, []);

  // object for values of context provider
  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    update,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
