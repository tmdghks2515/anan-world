import React, {useEffect, useState} from "react"
import {Button, Col, Dropdown, Menu, Modal, Row} from "antd";
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
    const location = useLocation()
    const navigate = useNavigate();
    const user = useSelector(state => _.get(state, 'user.value'))
    const noHeaderPages = ['/write']
    const [headerYn, setHeaderYn] = useState(true)

    useEffect(() => {
        checkHeaderYn()
    }, [location])

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleWrite = () => {
        navigate('/write')
    }

    const checkHeaderYn = () => {
        console.log('location', location)
        setHeaderYn(!noHeaderPages.includes(location.pathname))
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
        <>{
            headerYn ?
            <>
                <StyledHeader>
                    <Link to={'/'} className={'homeBtn'}>Anan</Link>
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
            : null
        }
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