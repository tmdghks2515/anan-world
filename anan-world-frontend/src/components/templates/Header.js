import React from "react"
import {Button, Col, Dropdown, Menu, Modal, Row} from "antd";
import {CustomButton} from "../../static/styles/buttons";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { open, close } from "../../slices/modals/loginModal"
import LoginModal from "../modals/LoginModal";
import _ from "lodash";
import {logout} from "../../slices/user";
import {DownOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => _.get(state, 'user.value'))

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleWrite = () => {
        navigate('/write')
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
                <CustomButton radius="50px" marginx="10px" onClick={handleWrite}>글 쓰기</CustomButton>
                {_.get(user, 'signed') ?
                    <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {_.get(user, 'username')} <DownOutlined />
                        </a>
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