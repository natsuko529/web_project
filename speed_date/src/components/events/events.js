import apiRequest from "../../api/apiRequest";
import { api_events } from "../../api/events";
import { useState, useEffect } from "react";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        time: '',
        address: '',
        price: 1,
    });

    useEffect(() => {
        apiRequest(api_events.getAllEvents)
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error(error));
    }, []);

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        apiRequest(api_events.createEvent, newEvent)
            .then(() => {
                // Refresh event list
                return api_events.getAllEvents();
            })
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Events</h2>
            <ul>
                {events.map(event => (
                    <p key={event.id}>
                        <strong>Title:</strong> {event.title} <br />
                        <strong>Date:</strong> {event.date} <br />
                        <strong>Time:</strong> {event.time} <br />
                        <strong>Address:</strong> {event.address} <br />
                        <strong>Price:</strong> {event.price}
                    </p>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} />
                <label>Date:</label>
                <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
                <label>Time:</label>
                <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} />
                <label>Address:</label>
                <input type="text" name="address" value={newEvent.address} onChange={handleInputChange} />
                <label>Price:</label>
                <input type="number" name="price" value={newEvent.price} onChange={handleInputChange} />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default Events;
