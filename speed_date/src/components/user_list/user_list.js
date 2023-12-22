import apiRequest from "../../api/apiRequest";
import { api_user } from "../../api/user";
import { useEffect, useState } from "react";
import { cookieService } from "../../service/cookieservice";
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        apiRequest(api_user.getAllUsers)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleRoleToggle = (userId, currentRole) => {
        const newRole = currentRole === 'USER' ? 'ADMIN' : 'USER';
        apiRequest(api_user.updateRole, userId, newRole)
            .then(() => api_user.getAllUsers())
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const isAdmin =cookieService.getRole() === '[ROLE_ADMIN]';
    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <p key={user.id}>
                        <strong>Name:</strong> {user.name} <br />
                        <strong>Surname:</strong> {user.surname} <br />
                        <strong>Date:</strong> {user.date} <br />
                        <strong>Weight:</strong> {user.weight} <br />
                        <strong>Height:</strong> {user.height} <br />
                        <strong>Children:</strong> {user.children} <br />
                        <strong>Email:</strong> {user.email} <br />
                        <strong>Phone:</strong> {user.phone} <br />


                        <strong>Role:</strong> {user.role} <br />
                        {isAdmin && <button onClick={() => handleRoleToggle(user.id, user.role)}>
                            Toggle to {user.role === 'USER' ? 'ADMIN' : 'USER'}
                        </button>}
                    </p>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
