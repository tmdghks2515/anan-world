import './App.css';
import "antd/dist/antd.css";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/templates/Header";
import styled, {ThemeProvider} from "styled-components"
import {GlobalStyle} from "./static/styles/global";
import {CookiesProvider} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import userAPI from "./api/userAPI";
import _ from "lodash";
import {checkUserStatus, login, setUser} from "./slices/user";
import {useEffect} from "react";
import {Container} from "./static/styles/common";
import Write from "./pages/Write";

const App = () => {

    const dispatch =  useDispatch()
    const theme = {}

    useEffect(() => {
        dispatch(checkUserStatus())
    }, [])

  return (
      <CookiesProvider>
          <ThemeProvider theme={theme}>
              <GlobalStyle>
                  <Container>
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/about" element={<About/>} />
                            <Route path="/write" element={<Write/>} />
                        </Routes>
                  </Container>
              </GlobalStyle>
          </ThemeProvider>
      </CookiesProvider>
  );
}


export default App;
