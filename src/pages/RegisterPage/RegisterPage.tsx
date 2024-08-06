import React, { useState } from "react";
import styles from "./RegisterPage.module.scss";
import { classNames } from "../../helpers/classNames";
import axios from "axios";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

interface RegisterPageProps {
  className?: string;
}

export const RegisterPage = ({ className }: RegisterPageProps) => {
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
    registerUser();
  };

  const registerUser = () => {
    const newUser = {
      email,
      login,
      password,
    };
    axios
      .post("http://localhost:8080/register", newUser)
      .then((res) => {
        console.log(res.data);
        dispatch(
          setUser({
            accessToken: res.data.accessToken,
            email: res.data.user.email,
            login: res.data.user.login,
            id: res.data.user.id,
          })
        );
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={classNames(styles.registerPage, {}, [className])}>
      <h3 className={styles.title}>Регистрация</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Почта"
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
          Зарегистрироваться
        </button>
      </form>
      <p className={styles.text}>
        Если вы уже зарегистрированы -{" "}
        <span
          className={styles.link}
          onClick={() => {
            navigate("/login");
          }}
        >
          войдите
        </span>
      </p>
    </div>
  );
};
