import React, { useState } from "react";
import styles from "./CartPage.module.scss";
import { classNames } from "../../helpers/classNames";
import { useAppDispatch, useAppSelector } from "../../store";
import { CartItem } from "../../components/CartItem/CartItem";
import { Button, Modal, Box, Typography, Divider } from "@mui/material";
import axios from "axios";
import { clearCart } from "../../store/cartSlice";

interface CartPageProps {
  className?: string;
}

export const CartPage = ({ className }: CartPageProps) => {
  const [open, setOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addOrder = async () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    const newOrder = {
      date: formattedDate,
      items: cartItems,
      totalPrice,
      userId: user.id,
    };

    try {
      await axios.post("http://localhost:3000/orders", newOrder);
      handleClose(); // Close the modal after the order is placed
    } catch (error) {
      console.error("Error placing the order:", error);
    }
    dispatch(clearCart());
  };

  return (
    <div className={classNames(styles.cartPage, {}, [className])}>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <Typography variant="h6">Корзина пуста 😔</Typography>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.title} cartItem={cartItem} />
            ))}
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            className={styles.btn}
          >
            Оформить заказ
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: {
                  xs: "80%", // width 80% when the screen size is below 600px
                  sm: "50%", // width 50% when the screen size is above 600px
                },
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  marginBottom: 2,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Подтвердите информацию о заказе
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <div className={styles.cartItems}>
                {cartItems.map((cartItem) => (
                  <div key={cartItem.title} className={styles.cartItem}>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {cartItem.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Количество: {cartItem.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Цена: {cartItem.price} руб.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Итого: {cartItem.quantity * cartItem.price} руб.
                    </Typography>
                  </div>
                ))}
              </div>
              <Divider sx={{ marginTop: 2 }} />
              <Typography
                variant="h6"
                component="h2"
                className={styles.total}
                sx={{ marginTop: 2, fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Общая стоимость: {totalPrice} руб.
              </Typography>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                Назад
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  ml: 2,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
                onClick={addOrder}
              >
                Оформить заказ
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};
