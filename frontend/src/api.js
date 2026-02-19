import axios from "axios";


export default axios.create({
baseURL: import.meta.env.VITE_BACKEND_URL+"/api" || "http://localhost:5000/api",
withCredentials: false
});