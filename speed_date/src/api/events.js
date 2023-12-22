import { cookieService } from "../service/cookieservice"
function getAllEvents() {
    return fetch("http://localhost:8080/event/all",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieService.getAccessToken()}`
        }
    })
}

function createEvent(event) {
    return fetch("http://localhost:8080/event/create",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieService.getAccessToken()}`
        },
        body: JSON.stringify(event)
    })
}

function getEventById(id) {
    return fetch(`http://localhost:8080/event/${id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieService.getAccessToken()}`
        }
    })
}

export const api_events = {
    getAllEvents,
    createEvent,
    getEventById
}