// Function to decode the JWT and check if it's expired
export function isTokenExpired(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      console.log(payload.fullName);

      const now = Date.now().valueOf() / 1000;
      if (typeof payload.exp !== 'undefined' && payload.exp < now) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Couldn't decode token:", error);
      return true; // Assume expired or invalid if an error occurs
    }
  }

// Function to decode JWT Token
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};