import React, {useEffect, useState} from 'react'
import MyViewer from "../components/post/MyViewer";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import postAPI from "../api/postAPI";
import Profile from "../components/user/Profile";
import {Divider} from "antd";
import CommentsBlock from "../components/post/comment/CommentsBlock";
import {useDispatch, useSelector} from "react-redux";
import {read, setPost} from "../slices/form/post";
import _ from "lodash";

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
        console.log(document.body.scrollHeight - window.innerHeight - window.scrollY)
        if (document.body.scrollHeight - (window.innerHeight + window.scrollY) < 1)
            scrollBottom()
    }

    return (
        <ViewerContainer>
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
        </ViewerContainer>
    )
}

export default Post

const ViewerContainer = styled.div`
    width: 55%;
    min-width: 30rem;
    margin: 0 auto;
    background-color: white;
`