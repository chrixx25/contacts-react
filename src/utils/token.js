// return the user data from the session storage
export const getUser = () => {
    const token = localStorage.getItem('token');
    const userStr = token ? JSON.parse(atob(token.split(".")[1])) : "";
    if (userStr) return userStr;
    else return null;
}

// return the token from the session storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeToken = () => {
    localStorage.removeItem('token');
}

// set the token and user from the session storage
export const setToken = (token) => {
    localStorage.setItem('token', token);
}