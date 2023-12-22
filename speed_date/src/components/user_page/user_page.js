import React, { useState, useEffect } from 'react';
import { api_user } from '../../api/user';
import { cookieService } from '../../service/cookieservice';
import apiRequest from '../../api/apiRequest';
import './user_page.module.css'
const UserPage = () => {

    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        apiRequest(api_user.getUser)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error retrieving user data');
                }
            })
            .then(data => setUser(data))
            .catch(error => console.error(error));
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        gender: '',
        date: '',
        weight: '',
        height: '',
        children: '',
        phone: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                surname: user.surname || '',
                email: user.email || '',
                password: '',
                gender: user.gender || '',
                date: user.gender || '',
                weight: user.weight || '',
                height: user.height || '',
                children: user.children || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        apiRequest(api_user.userUpdate, formData)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setEditMode(false)
            })
            .catch((error) => console.error(error));
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    return (
        <div>
            <h1 className="title">User Page</h1>
            {user ? (
                editMode ? (
                    <form onSubmit={handleSubmit} className="form">
                        <label style={{ display: 'block', marginBottom: '10px' }}>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', padding: '5px' }}
                        />
                        <label style={{ display: 'block', marginBottom: '10px' }}>Surname:</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', padding: '5px' }}
                        />
                        <label style={{ display: 'block', marginBottom: '10px' }}>Weight:</label>
                        <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', padding: '5px' }}
                        />
                        <label style={{ display: 'block', marginBottom: '10px' }}>Height:</label>
                        <input
                            type="text"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', padding: '5px' }}
                        />
                        <label style={{ display: 'block', marginBottom: '10px' }}>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', padding: '5px' }}
                        />
                        <label style={{ display: 'block', marginBottom: '10px' }}>Children:</label>
                        <input
                            type="text"
                            name="children"
                            value={formData.children}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', padding: '5px' }} />

                        {/* Add other form fields here */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button style={{ display: 'block', marginBottom: '10px' }} type="submit" className="button">
                                Save
                            </button>
                            <button style={{ display: 'block', marginBottom: '10px' }} onClick={() => setEditMode(false)}>cancel</button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p className="text">Name: {user.name}</p>
                        <p className="text">Surname: {user.surname}</p>
                        <p className="text">Email: {user.email}</p>
                        <p className="text">Phone: {user.phone}</p>
                        {/* <p className="text">Gender: {user.gender}</p> */}
                        <p className="text">Date of Birth: {user.date}</p>
                        <p className="text">Weight: {user.weight}</p>
                        <p className="text">Height: {user.height}</p>
                        <p className="text">Children: {user.children}</p>
                        <p className="text">Role: {user.role}</p>
                        <button onClick={handleEdit} className="button">
                            Edit
                        </button>

                    </div>
                )
            ) : (
                <p className="text">Loading user data...</p>
            )}
        </div>
    );
};

export default UserPage;