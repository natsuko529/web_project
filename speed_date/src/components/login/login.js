import React, { useState } from "react";
import { api_user } from "../../api/user";
import { cookieService } from "../../service/cookieservice";
import styles from "./login.module.css";
const LoginWindow = () => {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [loginInput, setLoginInput] = useState("example@mail.ru");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const handleDropdownChange = (e) => {
    setSelectedDomain(e.target.value);
    if (e.target.value !== "other") {
      setLoginInput(e.target.value);
    } else {
      setLoginInput("");
    }
  };
  const handleLoginInputChange = (e) => {
    setLoginInput(e.target.value);
  };
  const handleClearLoginInput = () => {
    setLoginInput("");
  };
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleLogin = () => {
    api_user
      .login(loginInput, passwordInput)
      .then((Response)=>{
        return Response.json();
      })
      .then((data) => {
        cookieService.setAccessToken(data.access);
        cookieService.setRefreshToken(data.refresh);
        cookieService.setRole(data.roles);
        cookieService.setExpiration(data.expiration);
        window.location.href = "/user_page";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <label className={styles.label}>Login</label>
        <div className={styles.loginContainer}>
          <input
            type="text"
            className={styles.loginInput}
            value={loginInput}
            onChange={handleLoginInputChange}
          />
          {selectedDomain && selectedDomain !== "other" && (
            <div className={styles.clearIcon} onClick={handleClearLoginInput} />
          )}
          <select
            className={styles.dropdown}
            value={selectedDomain}
            onChange={handleDropdownChange}
          >
            {/* <option value=""></option> */}
            <option value="@mail.ru">{"@mail.ru"}</option>
            <option value="@gmail.com">{"@gmail.com"}</option>
            <option value="@yandex.ru">{"@yandex.ru"}</option>
            <option value="other">Other</option>
          </select>
        </div>
        <label className={styles.label}>Password</label>
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            className={styles.input}
            onChange={handlePasswordInputChange}
          />
          <button
            className={styles.eyeIcon}
            onClick={handleTogglePasswordVisibility} />
          {/* <button onClick={handleLogin}
            style={styles.button}>Login</button> */}
        </div>
      </div>
      <button className={styles.registrationButton}onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginWindow;
