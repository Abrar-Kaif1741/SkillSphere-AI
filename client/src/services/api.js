import axios from "axios";

const api = axios.create({
  baseURL: "https://skillsphere-ai-bsiv.onrender.com/api",
});

export default api;