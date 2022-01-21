import './App.css';
import "antd/dist/antd.css";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/templates/Header";
import {ThemeProvider} from "styled-components"
import {GlobalStyle} from "./static/styles/global";
import {CookiesProvider} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {checkUserStatus} from "./slices/user";
import React, {useEffect, useState} from "react";
import {Container} from "./static/styles/common";
import Write from "./pages/Write";
import Post from "./pages/Post";
import {useLocation, useNavigate} from "react-router";
import {message} from "antd";
import _ from "lodash";

const App = () => {

    const dispatch =  useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const signNeededUrl = ['/write']
    const noHeaderPages = ['/write']
    const user = useSelector(state => _.get(state, 'user.value'))
    const [headerYn, setHeaderYn] = useState(true)

    useEffect(() => {
        dispatch(checkUserStatus())
    }, [])

    useEffect((e) => {
        if (signNeededUrl.includes(location.pathname) && !user.signed)
            navigate(-1)
        if(noHeaderPages.includes(location.pathname))
            setHeaderYn(false)
        else
            setHeaderYn(true)
    }, [location])

  return (
      <CookiesProvider>
          <GlobalStyle>
              <Container>
                  {headerYn ?
                    <Header/> : null
                  }
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/write" element={<Write/>} />
                    <Route path={`/@:username/:postId`} element={<Post/>}/>
                </Routes>
              </Container>
          </GlobalStyle>
      </CookiesProvider>
  );
}


export default App;
