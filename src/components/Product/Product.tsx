import React, { useState } from "react";
import styles from "./Product.module.scss";
import { classNames } from "../../helpers/classNames";
import { Product as productType } from "../../store/productsSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { Snackbar, Alert } from "@mui/material";
import { addItem } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  className?: string;
  product: productType;
}

export const Product = ({ className, product }: ProductProps) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuth) {
      setOpenSnackbar(true);
    } else {
      const cartItem = {
        title: product.title,
        price: product.price,
        image: product.images[0],
      };
      dispatch(addItem(cartItem));
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

  return (
    <div className={classNames(styles.product, {}, [className])}>
      <img
        onClick={() => {
          navigate(`/product/${product.id}`);
        }}
        src={product.images[0]}
        alt=""
        className={styles.img}
      />
      <div className={styles.lowerPart}>
        <div className={styles.lowerPartRight}>
          <h3
            className={styles.title}
            onClick={() => {
              navigate(`/product/${product.id}`);
            }}
          >
            {product.title}
          </h3>
          <p className={styles.price}>{product.price} ₽</p>
        </div>
        <button className={styles.btn} onClick={handleAddToCart}>
          В корзину
        </button>
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
          Вы должны войти в систему, чтобы использовать корзину.
        </Alert>
      </Snackbar>
    </div>
  );
};
