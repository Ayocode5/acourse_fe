import { getCookieItem } from "../hooks/useCookie";
export default function authHeader() {
  const accessToken = getCookieItem("access_token");
  if (accessToken) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
      "X-User-Permission": "r",
    };
  } else {
    return {};
  }
}
