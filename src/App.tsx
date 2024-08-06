import React, { createContext, useState, ReactNode, Suspense } from "react";
import "./styles/index.scss";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { classNames } from "./helpers/classNames";
import { routes } from "./routes";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

interface Props {
  children: ReactNode;
}

export const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Suspense fallback="">
        <div className={classNames("app", {}, [theme])}>
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Suspense>
    </ThemeContext.Provider>
  );
};
