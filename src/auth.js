export const saveToken = (token) => {
    localStorage.setItem('jwtToken', JSON.stringify(token));
  };
  export const getToken = () => {
    const token = localStorage.getItem('jwtToken');
    return token ? JSON.parse(token) : null;
  };
export const removeToken = () => localStorage.removeItem('jwtToken');
