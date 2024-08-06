import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { classNames } from "../../helpers/classNames";
import axios from "axios";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  className?: string;
}

export const LoginPage = ({ className }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = () => {
    const userData = {
      email,
      login,
      password,
    };
    axios
      .post("http://localhost:8080/login", userData)
      .then((res) => {
        console.log(res.data);
        dispatch(
          setUser({
            accessToken: res.data.accessToken,
            login: res.data.user.login,
            id: res.data.user.id,
            email: res.data.user.email,
          })
        );
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={classNames(styles.loginPage, {}, [className])}>
      <h3 className={styles.title}>Вход в систему</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={handleLoginChange}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Войти
        </button>
      </form>
      <p className={styles.text}>
        Если вы еще не зарегистрированы -{" "}
        <span
          className={styles.link}
          onClick={() => {
            navigate("/register");
          }}
        >
          зарегистрируйтесь
        </span>
      </p>
    </div>
  );
};
