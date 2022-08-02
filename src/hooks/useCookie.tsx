import { useState } from "react";

export const getCookieItem = (cname: string): string => {
  const cookie: any = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie[cname];
};

export const setCookieItem = (
  key: string,
  value: string,
  expire: number
): void => {
  const dateExpire = new Date(new Date(expire).getTime() * 1000);
  document.cookie = `${key}=${value};expires=${dateExpire.toUTCString()};path=/`;
};

const useCookie = (key: string, defaultValue: string): any[] => {
  const getCookie = () => getCookieItem(key) || defaultValue;
  const [cookie, setCookie] = useState<string>(getCookie());

  const updateCookie = (value: string, expire: number) => {
    setCookie(value);
    setCookieItem(key, value, expire);
  };
  return [cookie, updateCookie];
};

export default useCookie;
