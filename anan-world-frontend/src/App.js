import './App.css';
import "antd/dist/antd.css";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/templates/Header";
import styled, {ThemeProvider} from "styled-components"
import {GlobalStyle} from "./static/styles/global";

const App = () => {

    const theme = {}

  return (
      <ThemeProvider theme={theme}>
          <GlobalStyle>
            <Header/>
            <Routes>
                <Route path="/" element={<Home className="Home"/>} />
                <Route path="/about" element={<About/>} />
            </Routes>
          </GlobalStyle>
      </ThemeProvider>
  );
}


export default App;
