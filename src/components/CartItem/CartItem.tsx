import React from "react";
import styles from "./CartItem.module.scss";
import { classNames } from "../../helpers/classNames";
import {
  CartItem as CartItemType,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../store/cartSlice";
import { useAppDispatch } from "../../store";
import { FaTrash } from "react-icons/fa";

interface CartItemProps {
  className?: string;
  cartItem: CartItemType;
}

export const CartItem = ({ className, cartItem }: CartItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className={classNames(styles.cartItem, {}, [className])}>
      <img src={cartItem.image} alt="" className={styles.img} />
      <div>
        <h3 className={styles.text}>{cartItem.title}</h3>
        <p className={styles.text}>{cartItem.price}</p>
      </div>
      <div className={styles.quantityBtns}>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(increaseQuantity(cartItem.title));
          }}
        >
          +
        </button>
        <p className={styles.text}>{cartItem.quantity}</p>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(decreaseQuantity(cartItem.title));
          }}
        >
          -
        </button>
        <button
          className={styles.removeBtn}
          onClick={() => {
            dispatch(removeItem(cartItem.title));
          }}
        >
          {" "}
          <FaTrash className={styles.trash} />
        </button>
      </div>
    </div>
  );
};
