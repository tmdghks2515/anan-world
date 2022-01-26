import React from 'react'
import {Card} from "antd";
import Meta from "antd/lib/card/Meta";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {setPost} from "../../slices/form/post";
import _ from "lodash";
import Utils from "../../utils/Utils";
import {Link} from "react-router-dom";
import moment from "moment";
import {CommentOutlined, EyeOutlined, HeartFilled} from "@ant-design/icons";

const PostCard = (props) => {
    const { post }  = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/@${post.writerName}/${post.postId}`)
    }

    return (
        <StyledCard
            hoverable
        >
            <StyledMeta
                title={post.postTitle}
                description={Utils.shortenSentence(post.postContent)}
                onClick={handleClick}
            />
            <StyledCardInfo>
                <CommentOutlined />
                {post.commentsCnt}
                <HeartFilled />
                <EyeOutlined />
            </StyledCardInfo>
            <StyledCardFooter>
                by &nbsp;
                <StyledLink to={`/@${post.writerName}`}>
                    {post.writerName}
                </StyledLink>&nbsp;
                · {moment(post.createdAt).fromNow()}
            </StyledCardFooter>
        </StyledCard>
    )
}

export default PostCard

const StyledCard = styled(Card)`
    text-align: left;
    width: 15rem;
    height: 18rem;
    cursor: default;
    display: inline-block;
    margin: 1rem;
`
const StyledMeta = styled(Meta)`
    cursor: pointer;
    height: 12rem;
`
const StyledCardFooter = styled.p`
    color: #b8b8b8;
    font-size: 0.8rem;
`
const StyledCardInfo = styled.p`
`
const StyledLink = styled(Link)`
    color: black;
    font-weight: 500;
`