const registerRegex = {
  USER_REGEX: /^[A-z][A-z0-9-_]{3,23}$/,
  PHONE_NUMBER_REGEX: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
  EMAIL_REGEX:
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  PWD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
};

export default registerRegex;
