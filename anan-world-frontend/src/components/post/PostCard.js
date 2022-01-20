import React from 'react'
import {Card} from "antd";
import Meta from "antd/lib/card/Meta";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {setPost} from "../../slices/form/post";
import _ from "lodash";

const PostCard = (props) => {
    const { post }  = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/@${post.writerName}/${post.postId}`)
    }

    const getDescription = (content) => {
        const reg = /[\{\}\[\]\/.,;:|\)*~`^\-_+<>@\#$%&\\\=\(\'\"]/gi
        const afterReg = content.replace(reg, '')
        return _.size(afterReg) > 30 ? afterReg.substr(0, 30) + ' ... ' : afterReg
    }

    return (
        <StyledCard
            hoverable
        >
            <StyledMeta
                title={post.postTitle}
                description={getDescription(post.postContent)}
                onClick={handleClick}
            />
        </StyledCard>
    )
}

export default PostCard

const StyledCard = styled(Card)`
    width: 300px;
    height: 250px;
    margin 20px 10px;
    cursor: default;
`
const StyledMeta = styled(Meta)`
    cursor: pointer;
`