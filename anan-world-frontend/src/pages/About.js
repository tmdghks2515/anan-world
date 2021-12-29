import React from "react";
import {Link} from "react-router-dom";

const About = () => {
    return (
        <>
            <h1>소개</h1>
            <p>라액트 라우터를 사용해 보는 프로젝트 입니다</p>
            <Link to="/">홈</Link>
        </>
    )
}

export default About