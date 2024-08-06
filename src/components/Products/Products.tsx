import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { classNames } from "../../helpers/classNames";
import { Product as productType } from "../../store/productsSlice";
import { Product } from "../Product/Product";

interface ProductsProps {
  className?: string;
  products: productType[];
}

export const Products = ({ className, products }: ProductsProps) => {
  return (
    <div className={classNames(styles.products, {}, [className])}>
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
};
