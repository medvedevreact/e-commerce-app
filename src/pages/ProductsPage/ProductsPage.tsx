import React, { useEffect } from "react";
import styles from "./ProductsPage.module.scss";
import { classNames } from "../../helpers/classNames";
import { Products } from "../../components/Products/Products";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProducts } from "../../store/productsSlice";

interface ProductsPageProps {
  className?: string;
}

export const ProductsPage = ({ className }: ProductsPageProps) => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(products);
  return (
    <div className={classNames(styles.productsPage, {}, [className])}>
      <Products products={products} />
    </div>
  );
};
