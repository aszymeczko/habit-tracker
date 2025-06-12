import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import "./App.css";

const App = () => {
    return (
        <main>
                <Header />
                <Home></Home>
                {/*<Routes>*/}
                {/*    <Route path="/" element={<Home />} />*/}
                {/*</Routes>*/}
                <Footer />
        </main>
    );
};

export default App;
