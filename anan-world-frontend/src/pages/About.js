import React, {useState} from "react";
import {Link} from "react-router-dom";
import {CustomButton} from "../static/styles/buttons";
import {api} from "../utils/axios";
import _ from "lodash";

const About = () => {

    const [list, setList] = useState([])

    const click = () => {
        api.get('/user/list', {data: {iam:"aaa"}})
            .then(res => {
                // console.log('res!@#!@#', res)
                // setList(_.get(res, 'data'))
            })
            .catch(error => {

            })
    }


    return (
        <>
            <h1>소개</h1>
            <p>라액트 라우터를 사용해 보는 프로젝트 입니다</p>
            <CustomButton onClick={click}>
                불러오기
            </CustomButton>
            <Link to="/">홈</Link>
            {_.get(list[0], 'name')}
        </>
    )
}

export default About