import { cookieService } from "../service/cookieservice";
function registration(data) {
    return fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

function login(email, password) {
    return fetch("http://localhost:8080/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
}

function getUser() {
    return fetch("http://localhost:8080/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieService.getAccessToken()}`
        }
    })
}

function userUpdate(data) {
    return fetch("http://localhost:8080/user/updateduser", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieService.getAccessToken()}`
        },
        body: JSON.stringify(data)
    })
}

function updateToken() {
    return fetch("http://localhost:8080/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: cookieService.getRefreshToken() })

    })
}

function getAllUsers() {
    return fetch("http://localhost:8080/user/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieService.getAccessToken()}`
        }
    })
}

function updateRole(Id, newRole) {
    return fetch(`http://localhost:8080/user/update/${Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieService.getAccessToken()}`
        },
        body: newRole
    })
}

export const api_user = {
    registration,
    login,
    getUser,
    userUpdate,
    updateToken,
    getAllUsers,
    updateRole
};

