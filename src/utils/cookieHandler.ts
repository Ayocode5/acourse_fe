const setCookie = (cname: string, cvalue: string, exTime: string): void => {
  const dateExpire = new Date(exTime);

  let expires = "expires=" + dateExpire.toISOString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

// function getCookie(cname) {
//   let name = cname + "=";
//   let ca = document.cookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function checkCookie() {
//   let user = getCookie("username");
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//     user = prompt("Please enter your name:", "");
//     if (user != "" && user != null) {
//       setCookie("username", user, 365);
//     }
//   }
// }
export default {
  setCookie,
  //   checkCookie,
  //   getCookie,
};
