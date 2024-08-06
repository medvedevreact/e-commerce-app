import React, { useState, useContext } from "react";
import { classNames } from "../../helpers/classNames";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../store";
import { clearUser } from "../../store/userSlice";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { Snackbar, Alert, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const { toggleTheme } = useContext(ThemeContext);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("Ru");
  const { theme } = useContext(ThemeContext);

  const handleProfileClick = () => {
    if (!isAuth) {
      setSnackbarMessage(
        "Вы должны войти в систему, чтобы просматривать профиль."
      );
      setOpenSnackbar(true);
    } else {
      navigate("/profile");
    }
  };

  const handleCartClick = () => {
    if (!isAuth) {
      setSnackbarMessage(
        "Вы должны войти в систему, чтобы использовать корзину."
      );
      setOpenSnackbar(true);
    } else {
      navigate("/cart");
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const toggleLang = () => {
    if (lang === "Ru") {
      setLang("En");
      i18n.changeLanguage("en");
    } else {
      setLang("Ru");
      i18n.changeLanguage("ru");
    }
  };

  return (
    <div className={classNames(styles.header, {}, [className])}>
      <h2 className={styles.logo} onClick={() => navigate("/")}>
        E-commerce
      </h2>

      <FaBars
        className={styles.burgerMenuIcon}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      />

      <ul className={styles.links}>
        <li className={styles.link} onClick={() => navigate("/")}>
          Главная
        </li>
        <li className={styles.link} onClick={() => navigate("/products")}>
          Товары
        </li>
      </ul>

      <div className={styles.btns}>
        <FaUser className={styles.icon} onClick={handleProfileClick} />
        <FaShoppingCart className={styles.cartIcon} onClick={handleCartClick} />
        <Switch
          checked={theme === "light" ? false : true}
          onChange={toggleTheme}
          name="themeSwitch"
          inputProps={{ "aria-label": "theme switch" }}
        />
        {isAuth ? (
          <button
            className={styles.btn}
            onClick={() => {
              dispatch(clearUser());
              navigate("/");
            }}
          >
            Выйти
          </button>
        ) : (
          <button className={styles.btn} onClick={() => navigate("/register")}>
            Войти или зарегистрироваться
          </button>
        )}
      </div>

      <div
        className={classNames(
          styles.mobileMenu,
          { [styles.open]: menuOpen },
          []
        )}
      >
        <div className={styles.mobileLink} onClick={() => navigate("/")}>
          {t("Главная")}
        </div>
        <div
          className={styles.mobileLink}
          onClick={() => navigate("/products")}
        >
          {t("Товары")}
        </div>
        <div className={styles.mobileLink} onClick={handleProfileClick}>
          {t("Профиль")}
        </div>
        <div className={styles.mobileLink} onClick={handleCartClick}>
          {t("Корзина")}
        </div>
        <div className={styles.mobileLink} onClick={toggleTheme}>
          {t("Сменить тему")}
        </div>
        <div className={styles.mobileLink} onClick={toggleLang}>
          {t("Сменить язык")}
        </div>
        {isAuth ? (
          <div
            className={styles.mobileLink}
            onClick={() => {
              dispatch(clearUser());
              navigate("/");
            }}
          >
            Выйти
          </div>
        ) : (
          <div
            className={styles.mobileLink}
            onClick={() => navigate("/register")}
          >
            Войти или зарегистрироваться
          </div>
        )}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
