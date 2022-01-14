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

const App = () => {

    const dispatch =  useDispatch()
    const theme = {}

    const user = useSelector(state => state.user.value)

    useEffect(() => {
        dispatch(checkUserStatus())
    }, [])

  return (
      <CookiesProvider>
          <ThemeProvider theme={theme}>
              <GlobalStyle>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home className="Home"/>} />
                    <Route path="/about" element={<About/>} />
                </Routes>
              </GlobalStyle>
          </ThemeProvider>
      </CookiesProvider>
  );
}


export default App;
