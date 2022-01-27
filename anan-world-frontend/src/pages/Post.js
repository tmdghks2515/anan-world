import React, {useEffect, useState} from 'react'
import MyViewer from "../components/post/MyViewer";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import postAPI from "../api/postAPI";
import Profile from "../components/user/Profile";
import {Affix, Button, Col, Divider, message, Row} from "antd";
import CommentsBlock from "../components/post/comment/CommentsBlock";
import {useDispatch, useSelector} from "react-redux";
import {postLike, read, setPost} from "../slices/form/post";
import _ from "lodash";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

const Post = (props) => {
    const {username, postId} = useParams()
    const [post, setPost] = useState({})
    const user = useSelector(state => _.get(state, 'user.value'))

    useEffect( () => {
        load()
    }, [user])

    const load =  async () => {
        const res = await postAPI.read({postId, userId: user.id})
        if (_.isEqual(res.status, 200)) {
            const res2 = await postAPI.comments({postId})
            setPost({...res.data, comments: res2.data})
        }
    }

    const scrollBottom = () => {
        if (post.commentsCnt > _.size(post.comments)) {
            postAPI.comments({postId, size: _.size(post.comments)+10})
                .then(res => {
                    setPost({...post, comments: res.data})
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    window.onscroll = () => {
        if (document.body.scrollHeight - (window.innerHeight + window.scrollY) < 1)
            scrollBottom()
    }

    const postLikeHandler = () => {
        if(!post.postLikeYn)
            postLike()
        else
            postLikeCancel()
    }

    const postLike = () => {
        postAPI.postLike({postId: post.postId, userId: user.id})
            .then(res => {
                setPost({...post, postLikeCnt: post.postLikeCnt + 1, postLikeYn: true});
            })
            .catch(error => {
                console.log(error)
            })
    }

    const postLikeCancel = () => {
        postAPI.postLikeCancel({postId: post.postId, userId: user.id})
            .then(res => {
                setPost({...post, postLikeCnt: post.postLikeCnt - 1, postLikeYn: false});
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Row>
            <Col span={4}>
                <StyledAffix
                    offsetTop={50}
                >
                    <AffixContainer>
                        <StyledButton
                            size={"large"}
                            onClick={postLikeHandler}
                            disabled={!user.signed}
                        >
                            {post.postLikeYn ?
                                <HeartFilled style={{fontSize: 16}}/> :
                                <HeartOutlined style={{fontSize: 16}}/>
                            }
                        </StyledButton>
                        <br/>
                        {post.postLikeCnt}
                    </AffixContainer>
                </StyledAffix>
            </Col>
            <Col span={16}>
                <MyViewer
                    post={post}
                />
                <Profile
                    writerName={post.writerName}
                />
                <Divider/>
                <CommentsBlock
                    post={post}
                    setPost={setPost}
                    load={load}
                />
            </Col>
        </Row>
    )
}

export default Post

const StyledAffix = styled(Affix)`
    margin-top: 12rem;
`
const AffixContainer = styled.div`
    margin: 0 auto;
    text-align: center;
    height: 8rem;
    width: 3.5rem;
    border-radius: 5rem;
    background-color: #eee;
    color: gray;
`
const StyledButton = styled(Button)`
    height: 3rem;
    width: 3rem;
    border-radius: 100rem;
    margin-top: 0.5rem;
    text-align: center;
`