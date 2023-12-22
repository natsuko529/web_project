import { cookieService } from '../../service/cookieservice';
import { NavLink } from 'react-router-dom';
import styles from './user_header.module.css';

const UserHeader = () => {
    const handleLogout = () => {
        cookieService.clearCookies();
    }

    return (
        <div className={styles.container}>
            <NavLink to='/users' className={styles.link}>Users</NavLink>
            <NavLink to='/events' className={styles.link}>Events</NavLink>
            <NavLink to='/user_page' className={styles.link}>User page</NavLink>
            <NavLink to='/login' className={styles.link}>Login</NavLink>
            <NavLink to='/registration' className={styles.link}>Registration</NavLink>
            <NavLink to='/login' className={styles.link} onClick={handleLogout}>Logout</NavLink>
        </div>
    );
}

export default UserHeader;
