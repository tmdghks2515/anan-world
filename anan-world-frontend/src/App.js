import './App.css';
import "antd/dist/antd.css";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/templates/Header";
import styled from "styled-components"
import {GlobalTheme} from "./static/styles/theme";

const App = () => {
  return (
      <GlobalTheme>
        <Header/>
        <Routes>
            <Route path="/" element={<Home className="Home"/>} />
            <Route path="/about" element={<About/>} />
        </Routes>
      </GlobalTheme>
  );
}


export default App;
