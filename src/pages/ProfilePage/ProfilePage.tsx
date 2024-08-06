import React, { useEffect, useState } from "react";
import styles from "./ProfilePage.module.scss";
import { classNames } from "../../helpers/classNames";
import { useAppSelector } from "../../store";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CartItem } from "../../store/cartSlice";

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = ({ className }: ProfilePageProps) => {
  const user = useAppSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders`, {
          params: { userId: user.user.id },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
      }
    };

    if (showOrders) {
      fetchOrders();
    }
  }, [user.user.id, showOrders]);

  const handleShowOrders = () => setShowOrders(true);
  const handleShowUserInfo = () => setShowOrders(false);

  return (
    <div className={classNames(styles.profilePage, {}, [className])}>
      <h1 className={styles.pageTitle}>Добро пожаловать, {user.user.login}!</h1>
      <div className={styles.btns}>
        <button onClick={handleShowOrders} className={styles.btn}>
          История заказов
        </button>
        <button onClick={handleShowUserInfo} className={styles.btn}>
          Информация о пользователе
        </button>
      </div>
      {showOrders ? (
        orders.map((order) => (
          <Accordion key={order.id} className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={styles.accordionSummary}
            >
              <Typography>
                Заказ от {order.date} — Всего: {order.totalPrice} руб.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
              <div>
                {order.items.map((item: CartItem) => (
                  <div key={item.title} style={{ padding: 10 }}>
                    <Typography variant="h6">
                      {item.title} - {item.quantity} шт.
                    </Typography>
                    <Typography>Цена за единицу: {item.price} руб.</Typography>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: 100, height: "auto" }}
                    />
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <div className={styles.userInfo}>
          <Typography className={styles.text} variant="h6">
            User ID: {user.user.id}
          </Typography>
          <Typography className={styles.text} variant="h6">
            Login: {user.user.login}
          </Typography>
          <Typography className={styles.text} variant="h6">
            Email: {user.user.email}
          </Typography>
        </div>
      )}
    </div>
  );
};
