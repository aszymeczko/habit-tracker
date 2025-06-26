import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import "./App.css";
import Layout from "./components/views/Layout/Layout.js";

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
