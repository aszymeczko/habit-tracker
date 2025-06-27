import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./redux/store.jsx";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Tworzenie domyślnego motywu
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F6E2D3",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          transition: "0.2s", // Płynna animacja
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#9C7CA5", // Zmiana koloru ramki na hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#9C7CA5", // Kolor ramki po focuse
            },
          },
          "& label": {
            color: "#000", // Domyślny kolor etykiety
            transition: "0.2s",
          },
          "& label.Mui-focused": {
            color: "#9C7CA5", // Kolor etykiety na focus
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
