import React from "react";
import styles from "./Footer.module.scss";
import { classNames } from "../../helpers/classNames";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <div className={classNames(styles.footer, {}, [className])}>
      2024 by Medvedev Ivan
    </div>
  );
};
