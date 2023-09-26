import Cookies from "js-cookie";

// Set the secure HTTP-only cookie
export const setCookies = (bearerToken) => {
  Cookies.set("access_token", bearerToken, {
    secure: true, // Ensure the cookie is only sent over HTTPS
    sameSite: "strict", // Apply the same-site attribute for added security
    httpOnly: true, // Make the cookie HTTP-only to prevent JavaScript access
  });
};
