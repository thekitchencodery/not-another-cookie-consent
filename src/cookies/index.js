// import Cookie from 'cookie-universal'

// export const cookies = Cookie();

// export function getCookie(name){
//   return cookies.get(name);
// }

// export function setCookie (name, choices, cookieConfig={}) {
//     const expires = new Date()
//     expires.setDate(expires.getDate() + 365)

//     const options = Object.assign({}, cookieConfig, { expires })
//     cookies.set(name, { choices }, options)
//   }

// export  function removeCookie (cookieConfig) {
//     const { path } = cookieConfig
//     cookies.remove(cookieName, Object.assign({}, path ? { path } : {}))
//   }


export  function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
    return getCookie(cname);
  }
  
export function getCookie(name) {
  let cookie = fetchRawCookie(name);
  if(cookie){
    return JSON.parse(cookie);
  }else{
    return cookie;
  }
}

function fetchRawCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
export function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
         setCookie("username", user, 30);
       }
    }
  }