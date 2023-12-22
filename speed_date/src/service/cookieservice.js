import { Cookies } from "react-cookie";
const cookie = new Cookies();
function setAccessToken(token) {
    cookie.set("access_token", token);
}
function getAccessToken() {
    return cookie.get("access_token");
}

function setRefreshToken(token) {
    cookie.set("refresh_token", token);
}

function getRefreshToken() {
    return cookie.get("refresh_token");
}


function setExpiration(time) {
    cookie.set("expiration", time);
}

function getExpiration() {
    return cookie.get("expiration");
}

function setRole(role) {
    cookie.set("role", role);
}

function getRole() {
    return cookie.get("role");
}

function clearCookies() {
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    cookie.remove("expiration");
    cookie.remove("role");
}




export const cookieService = {
    setRefreshToken,
    getRefreshToken,
    setAccessToken,
    getAccessToken,
    setExpiration,
    getExpiration,
    setRole,
    getRole,
    clearCookies
};
