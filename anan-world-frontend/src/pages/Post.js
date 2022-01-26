import React, {useEffect, useState} from 'react'
import MyViewer from "../components/post/MyViewer";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import postAPI from "../api/postAPI";
import Profile from "../components/user/Profile";
import {Affix, Button, Col, Divider, Row} from "antd";
import CommentsBlock from "../components/post/comment/CommentsBlock";
import {useDispatch, useSelector} from "react-redux";
import {read, setPost} from "../slices/form/post";
import _ from "lodash";
import {HeartOutlined} from "@ant-design/icons";

const Post = (props) => {
    const {username, postId} = useParams()
    const [post, setPost] = useState({})

    useEffect( () => {
        load()
    }, [])

    const load =  async () => {
        const res = await postAPI.read({postId})
        if (_.isEqual(res.status, 200)) {
            const res2 = await postAPI.comments({postId})
            setPost({...res.data, comments: res2.data})
        }
    }

    const scrollBottom = async() => {
        if (post.commentsCnt > _.size(post.comments)) {
            const res = await postAPI.comments({postId, size: _.size(post.comments)+10});
            setPost({...post, comments: res.data})
        }
    }

    window.onscroll = () => {
        if (document.body.scrollHeight - (window.innerHeight + window.scrollY) < 1)
            scrollBottom()
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
                            // onClick={() => {
                            //     this.setState({
                            //         top: this.state.top + 10,
                            //     });
                            // }}
                        >
                            <HeartOutlined style={{fontSize: 20, color: '#c8c8c8'}}/>
                        </StyledButton>
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
    width: 4rem;
    border-radius: 5rem;
    background-color: #eee;
`
const StyledButton = styled(Button)`
    height: 3rem;
    border-radius: 100rem;
    margin-top: 1rem;
`