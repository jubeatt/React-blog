import { GlobalStyle } from "./components/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { getMe } from "./WebAPI";
import { getAuthToken, setAuthToken } from "./utiles";
import HomePage from "./pages/home-page/";
import AboutPage from "./pages/about-page/";
import PostsPage from "./pages/posts-page/";
import SinglePostPage from "./pages/single-post-page/";
import SignUpPage from "./pages/sign-up-page";
import CategoriesPage from "./pages/categories-page";
import LoginPage from "./pages/log-in-page";
import NavBar from "./components/NavBar";

const theme = {
  green_100: "#53bd9580",
  green_400: "#53BD95",
  green_500: "#3e8e70",
  gray_100: "#E6E6E6",
  gray_300: "#caccd3",
  gray_400: "#737A96",
  blue_100: "#E2EEFF",
  blue_400: "#4C98FF",
  red_400: "#ed143d",
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token === "null") return;
    getMe().then((res) => {
      console.log(res);
      if (res.ok === 1) {
        setUser(res.data);
      } else {
        setAuthToken(null);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<SinglePostPage />} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
