import { getCookieItem } from "../hooks/useCookie";
export default function authHeader() {
  const refreshToken = getCookieItem("refresh_token");
  if (refreshToken) {
    return {
      "Allow-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + refreshToken,
      "X-User-Permission": "r",
    };
  } else {
    return {};
  }
}
