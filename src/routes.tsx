import React from "react";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { ProductPage } from "./pages/ProductPage/ProductPage";

interface Route {
  path: string;
  component: React.ComponentType<any>;
}

export const routes: Route[] = [
  { path: "/", component: MainPage },
  { path: "/products", component: ProductsPage },
  { path: "/product/:id", component: ProductPage },
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
  { path: "/cart", component: CartPage },
  { path: "/profile", component: ProfilePage },
];
