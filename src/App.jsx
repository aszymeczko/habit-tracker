import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home.jsx";
import "./App.css";
import Layout from "./components/views/Layout/Layout.jsx";
import NotFound from "./components/pages/NotFound/NotFound.jsx";
import Calendar from "./components/pages/Calendar/Calendar.jsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
