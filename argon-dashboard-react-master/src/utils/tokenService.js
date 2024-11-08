

const TOKEN_KEY = 'authToken';


export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};


export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};


export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};


export const isTokenAvailable = () => {
  return !!localStorage.getItem(TOKEN_KEY); // Returns true if token exists
};
