import React from 'react'
import styled from "styled-components";
import {UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import {Link} from "react-router-dom";

const Profile = (props) => {
    const writerName = props.writerName

    return (
        <ProfileContainer>
            <Avatar size={64} icon={<UserOutlined />} />
            <span className={'wrtBy'}>Written by</span>
            <Link
                className={'wrtName'}
                to={`/@${writerName}`}
            >
                 {writerName}
            </Link>
        </ProfileContainer>
    )
}

export default Profile

const ProfileContainer = styled.div`
    margin: 3rem 0; 
    vertical-align: top;
    & .wrtBy{
        margin: 0 0.5rem 0 1rem;
        vertical-align: top;
    }
    & .wrtName{
        vertical-align: top;    
    }
`