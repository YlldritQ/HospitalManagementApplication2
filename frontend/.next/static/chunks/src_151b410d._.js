(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_151b410d._.js", {

"[project]/src/types/auth.types.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "GenderEnum": (()=>GenderEnum),
    "IAuthContextActionTypes": (()=>IAuthContextActionTypes),
    "RolesEnum": (()=>RolesEnum)
});
var IAuthContextActionTypes = /*#__PURE__*/ function(IAuthContextActionTypes) {
    IAuthContextActionTypes["INITIAL"] = "INITIAL";
    IAuthContextActionTypes["LOGIN"] = "LOGIN";
    IAuthContextActionTypes["LOGOUT"] = "LOGOUT";
    return IAuthContextActionTypes;
}({});
var RolesEnum = /*#__PURE__*/ function(RolesEnum) {
    RolesEnum["ADMIN"] = "Admin";
    RolesEnum["DOCTOR"] = "Doctor";
    RolesEnum["NURSE"] = "Nurse";
    RolesEnum["PATIENT"] = "Patient";
    RolesEnum["USER"] = "User";
    return RolesEnum;
}({});
var GenderEnum = /*#__PURE__*/ function(GenderEnum) {
    GenderEnum["FEMALE"] = "Female";
    GenderEnum["MALE"] = "Male";
    return GenderEnum;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/globalConfig.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// URLS
__turbopack_context__.s({
    "HOST_API_KEY": (()=>HOST_API_KEY),
    "LOGIN_URL": (()=>LOGIN_URL),
    "LOGS_URL": (()=>LOGS_URL),
    "ME_URL": (()=>ME_URL),
    "MY_LOGS_URL": (()=>MY_LOGS_URL),
    "PATH_AFTER_LOGIN": (()=>PATH_AFTER_LOGIN),
    "PATH_AFTER_LOGOUT": (()=>PATH_AFTER_LOGOUT),
    "PATH_AFTER_REGISTER": (()=>PATH_AFTER_REGISTER),
    "REGISTER_URL": (()=>REGISTER_URL),
    "UPDATE_ROLE_URL": (()=>UPDATE_ROLE_URL),
    "UPDATE_URL": (()=>UPDATE_URL),
    "USERNAMES_LIST_URL": (()=>USERNAMES_LIST_URL),
    "USERS_LIST_URL": (()=>USERS_LIST_URL)
});
const HOST_API_KEY = "https://localhost:7058/api";
const REGISTER_URL = "/Auth/register";
const LOGIN_URL = "/Auth/login";
const ME_URL = "/Auth/me";
const USERS_LIST_URL = "/Auth/users";
const UPDATE_ROLE_URL = "/Auth/update-role";
const UPDATE_URL = `/Auth/update/`;
const USERNAMES_LIST_URL = "/Auth/usernames";
const LOGS_URL = "/Logs";
const MY_LOGS_URL = "/Logs/mine";
const PATH_AFTER_REGISTER = /*route to be added later*/ "";
const PATH_AFTER_LOGIN = /*route to be added later*/ "";
const PATH_AFTER_LOGOUT = /*route to be added later*/ "";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/axiosInstance.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/globalConfig.ts [app-client] (ecmascript)");
;
;
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOST_API_KEY"]
});
axiosInstance.interceptors.response.use((response)=>response, (error)=>Promise.reject(error.response && error.response || 'General Axios Error happend'));
const __TURBOPACK__default__export__ = axiosInstance;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/auth/auth.utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "adminAccessRoles": (()=>adminAccessRoles),
    "adminDoctorPatientRoles": (()=>adminDoctorPatientRoles),
    "allAccessRoles": (()=>allAccessRoles),
    "allowedRolesForUpdateArray": (()=>allowedRolesForUpdateArray),
    "getSession": (()=>getSession),
    "isAuthorizedForUpdateRole": (()=>isAuthorizedForUpdateRole),
    "setSession": (()=>setSession)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosInstance.ts [app-client] (ecmascript)");
;
;
const setSession = (accessToken)=>{
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        console.log("Success from token");
    } else {
        localStorage.removeItem('accessToken');
        delete __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common.Authorization;
    }
};
const getSession = ()=>{
    return localStorage.getItem('accessToken');
};
const allAccessRoles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].DOCTOR,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].NURSE,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].PATIENT,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].USER
];
const adminAccessRoles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN
];
const adminDoctorPatientRoles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].DOCTOR,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].PATIENT
];
const allowedRolesForUpdateArray = (loggedInUser)=>{
    return loggedInUser?.roles.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN) ? [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].DOCTOR,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].NURSE,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].PATIENT,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].USER
    ] : [];
};
const isAuthorizedForUpdateRole = (loggedInUserRole, selectedUserRole)=>{
    let result = true;
    if (loggedInUserRole === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN && selectedUserRole === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN) {
        result = false;
    }
    return result;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/auth/auth.context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthContext": (()=>AuthContext),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth/auth.utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosInstance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/globalConfig.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
// reducer function for useReducer hook
const authReducer = (state, action)=>{
    if (action.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: action.payload
        };
    }
    if (action.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGOUT) {
        return {
            ...state,
            isAuthenticated: false,
            isAuthLoading: false,
            user: undefined
        };
    }
    return state;
};
//initial state object for useReducer hook
const initialAuthState = {
    isAuthenticated: false,
    isAuthLoading: true,
    user: undefined
};
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
// component to manage all auth functionalities and export
const AuthContextProvider = ({ children })=>{
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(authReducer, initialAuthState);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Initialize Method
    const initializeAuthContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthContextProvider.useCallback[initializeAuthContext]": async ()=>{
            try {
                const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])();
                if (token) {
                    // validate accessToken by calling backend
                    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ME_URL"], {
                        token
                    });
                    // In response, we receive jwt token and user data
                    const { newToken, userInfo } = response.data;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSession"])(newToken);
                    dispatch({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGIN,
                        payload: userInfo
                    });
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSession"])(null);
                    dispatch({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGOUT
                    });
                }
            } catch (error) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSession"])(null);
                dispatch({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGOUT
                });
            }
        }
    }["AuthContextProvider.useCallback[initializeAuthContext]"], []);
    // In start of Application, We call initializeAuthContext to be sure about authentication status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthContextProvider.useEffect": ()=>{
            console.log("AuthContext Initialization start");
            initializeAuthContext().then({
                "AuthContextProvider.useEffect": ()=>console.log("initializeAuthContext was successfull")
            }["AuthContextProvider.useEffect"]).catch({
                "AuthContextProvider.useEffect": (error)=>console.log(error)
            }["AuthContextProvider.useEffect"]);
        }
    }["AuthContextProvider.useEffect"], []);
    // Register Method
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthContextProvider.useCallback[register]": async (firstName, lastName, userName, email, gender, password, address)=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGISTER_URL"], {
                firstName,
                lastName,
                userName,
                email,
                gender,
                password,
                address
            });
            console.log("Register Result:", response);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Register Was Successfull. Please Login.");
            router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATH_AFTER_REGISTER"]);
        }
    }["AuthContextProvider.useCallback[register]"], [
        router
    ]);
    const update = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthContextProvider.useCallback[update]": async (id, userName, email, password, address)=>{
            try {
                // Send the update request
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UPDATE_URL"]}${id}`, {
                    userName,
                    email,
                    password,
                    address
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Update Successful");
                const { newToken, userInfo } = response.data;
                // Update session and context
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSession"])(newToken);
                dispatch({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGIN,
                    payload: userInfo
                });
                // Navigate after a short delay to ensure the state is updated
                router.push("/dashboard/profile");
            } catch (error) {
                console.error("Update Error:", error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Update Failed. Please try again.");
            }
        }
    }["AuthContextProvider.useCallback[update]"], [
        router
    ]);
    // Login Method
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthContextProvider.useCallback[login]": async (userName, password)=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOGIN_URL"], {
                userName,
                password
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Login Was Successful");
            // In response, we receive jwt token and user data
            const { newToken, userInfo } = response.data;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSession"])(newToken);
            dispatch({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGIN,
                payload: userInfo
            });
            router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATH_AFTER_LOGIN"]);
        }
    }["AuthContextProvider.useCallback[login]"], [
        router
    ]);
    // Logout Method
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthContextProvider.useCallback[logout]": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSession"])(null);
            dispatch({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGOUT
            });
            router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PATH_AFTER_LOGOUT"]);
        }
    }["AuthContextProvider.useCallback[logout]"], [
        router
    ]);
    // object for values of context provider
    const valuesObject = {
        isAuthenticated: state.isAuthenticated,
        isAuthLoading: state.isAuthLoading,
        user: state.user,
        register,
        update,
        login,
        logout
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: valuesObject,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/auth/auth.context.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
};
_s(AuthContextProvider, "zDH7fmhhd8n9FP5mzTBkDrXuMUU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthContextProvider;
const __TURBOPACK__default__export__ = AuthContextProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthContextProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_151b410d._.js.map