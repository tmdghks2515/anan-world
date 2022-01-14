import React from "react"
import {Button, Col, Dropdown, Menu, Modal, Row} from "antd";
import {CustomButton} from "../../static/styles/buttons";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { open, close } from "../../slices/modals/loginModal"
import LoginModal from "../modals/LoginModal";
import _ from "lodash";
import {logout} from "../../slices/user";
import userAPI from "../../api/userAPI";

const Header = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state => _.get(state, 'user.value'))

    const handleLogout = () => {
        dispatch(logout())
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" onClick={handleLogout}>
                    로그아웃
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <StyledHeader>
                <CustomButton radius="50px" marginx="10px">글 쓰기</CustomButton>
                {_.get(user, 'signed') ?
                    <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
                        <Button>{_.get(user, 'username')}</Button>
                    </Dropdown>
                    :
                    <CustomButton  radius="50px" onClick={() => dispatch(open()) }>로그인</CustomButton>
                }
            </StyledHeader>

            <LoginModal/>
        </>
    )
}

const StyledHeader = styled.div`
    padding: 10px;
    text-align: right;
`

export default Header