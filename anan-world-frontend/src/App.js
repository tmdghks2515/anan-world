import './App.css';
import "antd/dist/antd.css";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/templates/Header";
import {ThemeProvider} from "styled-components"
import {GlobalStyle} from "./static/styles/global";
import {CookiesProvider} from "react-cookie";
import {useDispatch} from "react-redux";
import {checkUserStatus} from "./slices/user";
import React, {useEffect} from "react";
import {Container} from "./static/styles/common";
import Write from "./pages/Write";
import Post from "./pages/Post";

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
                    <Header/>
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/about" element={<About/>} />
                            <Route path="/write" element={<Write/>} />
                            <Route path={`/@:username/:postId`} element={<Post/>}/>
                        </Routes>
                  </Container>
              </GlobalStyle>
          </ThemeProvider>
      </CookiesProvider>
  );
}


export default App;
