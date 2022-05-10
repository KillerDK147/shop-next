import http from "./httpService";
import jwtDecode from "jwt-decode";
const tokenKey = "x-auth-token";
const apiEndpoint = "login/";
console.log("apiEndpoint");
http.setJwt(getJWT());
export async function login(Email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { Email, password });
  localStorage.setItem(tokenKey, jwt);
  return jwt;
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJWT() {
  if (
    typeof window !== "undefined" &&
    localStorage.getItem(tokenKey) !== null
  ) {
    return localStorage.getItem(tokenKey);
  } else {
    if (typeof window !== "undefined") {
      return localStorage.setItem(tokenKey, Cookies.get());
    }
  }
}

export function getCurrentUser() {
  try {
    const jwt = getJWT();
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
