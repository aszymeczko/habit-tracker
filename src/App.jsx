import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import "./App.css";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box component="main">
        {/*<Routes>*/}
        {/*    <Route path="/" element={<Home />} />*/}
        {/*</Routes>*/}
        <Home />
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
