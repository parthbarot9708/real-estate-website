export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setRole = (role) => {
  localStorage.setItem("role", role); // Store role in localStorage
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role"); // Retrieve role from localStorage
};
