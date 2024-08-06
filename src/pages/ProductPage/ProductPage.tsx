import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store";
import { addItem } from "../../store/cartSlice";

import styles from "./ProductPage.module.scss";
import { classNames } from "../../helpers/classNames";

interface ProductPageProps {
  className?: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

export const ProductPage = ({ className }: ProductPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams<{ id: string }>();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Product>(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuth) {
      setOpenSnackbar(true);
    } else if (product) {
      dispatch(
        addItem({
          title: product.title,
          price: product.price,
          image: product.images[0],
        })
      );
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classNames(styles.productPage, {}, [className])}>
      <h1 className={styles.productPage__title}>{product.title}</h1>
      <h2 className={styles.productPage__price}>${product.price}</h2>
      <p className={styles.productPage__description}>{product.description}</p>
      <div className={styles.productPage__imageContainer}>
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={product.title}
            className={styles.productPage__image}
          />
        ))}
      </div>
      <button className={styles.btn} onClick={handleAddToCart}>
        Добавить в корзину
      </button>
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
