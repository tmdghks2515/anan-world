import React, {useEffect, useState} from "react"
import {Button, Col, Dropdown, Menu, message, Modal, Row} from "antd";
import {CustomButton} from "../../static/styles/buttons";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { open, close } from "../../slices/modals/loginModal"
import LoginModal from "../modals/LoginModal";
import _ from "lodash";
import {logout} from "../../slices/user";
import {DownOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router";
import {Link} from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => _.get(state, 'user.value'))

    const handleLogout = () => {
        dispatch(logout())
        message.success('로그아웃')
    }

    const handleWrite = () => {
        navigate('/write')
    }

    const menu = (
        <Menu>
            <Menu.Item key={'logout'}>
                <a target="_blank" onClick={handleLogout}>
                    로그아웃
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
            <>
                <StyledHeader>
                    <Link to={'/'} className={'homeBtn'}>Anan</Link>
                    {user.signed ?
                        <CustomButton radius="50px" marginx="10px" onClick={handleWrite}>글 쓰기</CustomButton> : null
                    }
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

export default Header

const StyledHeader = styled.div`
    padding: 10px;
    text-align: right;
    & .homeBtn{
        float: left;
        font-size: 20px;
        color: black;
        font-family: 'FiraMono';
        font-weight: bold;
    }
`