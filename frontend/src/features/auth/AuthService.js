import api from "../../services/api";

const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export default { login, register, logout };
