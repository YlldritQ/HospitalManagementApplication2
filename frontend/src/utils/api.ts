import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7058/api", // ✅ MUST match your .NET API port
});
