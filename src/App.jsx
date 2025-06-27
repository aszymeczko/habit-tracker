import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home.jsx";
import "./App.css";
import Layout from "./components/views/Layout/Layout.jsx";

const App = () => {
  return (
    <Layout>
      <Home />
      {/*<Routes>*/}
      {/*    <Route path="/" element={<Home />} />*/}
      {/*</Routes>*/}
    </Layout>
  );
};

export default App;
