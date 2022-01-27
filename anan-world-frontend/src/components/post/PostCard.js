import React from 'react'
import {Card} from "antd";
import Meta from "antd/lib/card/Meta";
import styled from "styled-components";
import {useNavigate} from "react-router";
import Utils from "../../utils/Utils";
import {Link} from "react-router-dom";
import moment from "moment";
import {CommentOutlined, EyeFilled, HeartFilled} from "@ant-design/icons";

const PostCard = (props) => {
    const { post }  = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/@${post.writerName}/${post.postId}`)
    }

    const actions = [
        <StyledSpan>
            <HeartFilled /> {post.postLikeCnt}
        </StyledSpan>,
        <StyledSpan>
            <CommentOutlined/> {post.commentsCnt}
        </StyledSpan>,
        <StyledSpan>
            <EyeFilled/> {post.postVisitCnt}
        </StyledSpan>
    ]

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
                by &nbsp;
                <StyledLink to={`/@${post.writerName}`}>
                    {post.writerName}
                </StyledLink>&nbsp;
                · {moment(post.createdAt).fromNow()}
            </StyledCardInfo>
            <StyledCardFooter>
                {actions.map(action => action)}
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
    float: left;
    margin: 1rem;
`
const StyledMeta = styled(Meta)`
    cursor: pointer;
    height: 13rem;
`
const StyledCardInfo = styled.p`
    width: 100%;
    color: #b8b8b8;
    font-size: 0.8rem;
    text-align: left;
`
const StyledCardFooter = styled.p`
    text-align: center;
`
const StyledLink = styled(Link)`
    color: black;
    font-weight: 500;
`
const StyledSpan = styled.span`
    margin: 0.5rem; 
`