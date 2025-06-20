module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/types/auth.types.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/src/utils/globalConfig.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/src/utils/axiosInstance.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/globalConfig.ts [app-ssr] (ecmascript)");
;
;
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HOST_API_KEY"]
});
axiosInstance.interceptors.response.use((response)=>response, (error)=>Promise.reject(error.response && error.response || 'General Axios Error happend'));
const __TURBOPACK__default__export__ = axiosInstance;
}}),
"[project]/src/auth/auth.utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosInstance.ts [app-ssr] (ecmascript)");
;
;
const setSession = (accessToken)=>{
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        console.log("Success from token");
    } else {
        localStorage.removeItem('accessToken');
        delete __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].defaults.headers.common.Authorization;
    }
};
const getSession = ()=>{
    return localStorage.getItem('accessToken');
};
const allAccessRoles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].DOCTOR,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].NURSE,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].PATIENT,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].USER
];
const adminAccessRoles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN
];
const adminDoctorPatientRoles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].DOCTOR,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].PATIENT
];
const allowedRolesForUpdateArray = (loggedInUser)=>{
    return loggedInUser?.roles.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN) ? [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].DOCTOR,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].NURSE,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].PATIENT,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].USER
    ] : [];
};
const isAuthorizedForUpdateRole = (loggedInUserRole, selectedUserRole)=>{
    let result = true;
    if (loggedInUserRole === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN && selectedUserRole === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RolesEnum"].ADMIN) {
        result = false;
    }
    return result;
};
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/auth/auth.context.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthContext": (()=>AuthContext),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth/auth.utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosInstance.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/globalConfig.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
// reducer function for useReducer hook
const authReducer = (state, action)=>{
    if (action.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: action.payload
        };
    }
    if (action.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGOUT) {
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
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
// component to manage all auth functionalities and export
const AuthContextProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(authReducer, initialAuthState);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Initialize Method
    const initializeAuthContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSession"])();
            if (token) {
                // validate accessToken by calling backend
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ME_URL"], {
                    token
                });
                // In response, we receive jwt token and user data
                const { newToken, userInfo } = response.data;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSession"])(newToken);
                dispatch({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGIN,
                    payload: userInfo
                });
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSession"])(null);
                dispatch({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGOUT
                });
            }
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSession"])(null);
            dispatch({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGOUT
            });
        }
    }, []);
    // In start of Application, We call initializeAuthContext to be sure about authentication status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log("AuthContext Initialization start");
        initializeAuthContext().then(()=>console.log("initializeAuthContext was successfull")).catch((error)=>console.log(error));
    }, []);
    // Register Method
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (firstName, lastName, userName, email, gender, password, address)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["REGISTER_URL"], {
            firstName,
            lastName,
            userName,
            email,
            gender,
            password,
            address
        });
        console.log("Register Result:", response);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Register Was Successfull. Please Login.");
        router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PATH_AFTER_REGISTER"]);
    }, [
        router
    ]);
    const update = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, userName, email, password, address)=>{
        try {
            // Send the update request
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UPDATE_URL"]}${id}`, {
                userName,
                email,
                password,
                address
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Update Successful");
            const { newToken, userInfo } = response.data;
            // Update session and context
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSession"])(newToken);
            dispatch({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGIN,
                payload: userInfo
            });
            // Navigate after a short delay to ensure the state is updated
            router.push("/dashboard/profile");
        } catch (error) {
            console.error("Update Error:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Update Failed. Please try again.");
        }
    }, [
        router
    ]);
    // Login Method
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (userName, password)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOGIN_URL"], {
            userName,
            password
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Login Was Successful");
        // In response, we receive jwt token and user data
        const { newToken, userInfo } = response.data;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSession"])(newToken);
        dispatch({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGIN,
            payload: userInfo
        });
        router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PATH_AFTER_LOGIN"]);
    }, [
        router
    ]);
    // Logout Method
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2f$auth$2e$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSession"])(null);
        dispatch({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IAuthContextActionTypes"].LOGOUT
        });
        router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$globalConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PATH_AFTER_LOGOUT"]);
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: valuesObject,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/auth/auth.context.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = AuthContextProvider;
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__2c25670b._.js.map