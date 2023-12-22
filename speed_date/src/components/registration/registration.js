import React, { useState } from "react";
import { api_user } from "../../api/user";
import styles from "./registration.module.css";
import { useNavigate } from "react-router-dom";
const RegistrationWindow = () => {
    const navigate = useNavigate();
    const [name, setFirstName] = useState("");
    const [surname, setLastName] = useState("");
    const [date, setDateOfBirth] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [children, setNumChildren] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const handleRegisration = () => {
        api_user.registration({ name, surname, date, weight, height, children, phone, email, gender, password })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then((data) => {
                navigate('/login')
            })
       
    }
    return (
        <div className={styles.modal}>
            <div className={styles.container}>
                <label className={styles.label}>First Name</label>
                <input
                    type="text"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label className={styles.label}>Last Name</label>
                <input
                    type="text"
                    className={styles.input}
                    value={surname}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label className={styles.label}>Gender</label>
                {/* <input
                    type="text"
                    style={styles.input}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                /> */}
                <select
                    className={styles.dropdown}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="Мужчина" onChange={(e) => setGender(e.target.value)}>{"Мужчина"}</option>
                    <option value="Женщина" onChange={(e) => setGender(e.target.value)}>{"Женщина"}</option>
                </select>


                <label className={styles.label}>Date of Birth</label>
                <input
                    type="date"
                    className={styles.input}
                    value={date}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />

                <label className={styles.label}>Weight</label>
                <input
                    type="text"
                    className={styles.input}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />

                <label className={styles.label}>Height</label>
                <input
                    type="text"
                    className={styles.input}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />

                <label className={styles.label}>Number of Children</label>
                <input
                    type="text"
                    className={styles.input}
                    value={children}
                    onChange={(e) => setNumChildren(e.target.value)}
                />

                <label className={styles.label}>Phone Number</label>
                <input
                    type="text"
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <label className={styles.label}>Email</label>
                <input
                    type="text"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className={styles.label}>Password</label>
                <div className={styles.passwordContainer}>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className={styles.eyeIcon}
                        onClick={handleTogglePasswordVisibility} />
                </div>
                <button className={styles.registrationButton} onClick={handleRegisration}>Register</button>
            </div>
        </div>
    );
};

export default RegistrationWindow;