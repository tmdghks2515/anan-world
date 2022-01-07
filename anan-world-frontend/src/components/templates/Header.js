import React from "react"
import {Button, Col, Modal, Row} from "antd";
import {CustomButton} from "../../static/styles/buttons";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { open, close } from "../../slices/modals/loginModal"
import LoginModal from "../modals/LoginModal";

const Header = (props) => {

    const dispatch = useDispatch()

    return (
        <>
            <StyledHeader>
                <Row>
                    <Col span={21}></Col>
                    <Col span={3}>
                        <CustomButton radius="50px" marginx="10px">글 쓰기</CustomButton>
                        <CustomButton  radius="50px" onClick={() => dispatch(open()) }>로그인</CustomButton>
                    </Col>
                </Row>
            </StyledHeader>

            {/** 로그인 모달 */}
            <LoginModal/>
        </>
    )
}

const StyledHeader = styled.div`
    padding: 10px;
`

export default Header