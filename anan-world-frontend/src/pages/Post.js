import React, {useEffect, useState} from 'react'
import MyViewer from "../components/post/MyViewer";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import postAPI from "../api/postAPI";

const Post = (props) => {
    const {username, postId} = useParams()
    const [post, setPost] = useState({})

    useEffect( () => {
        read()
    }, [])

    const read = async () => {
        await postAPI.read(postId)
            .then(res => {
                setPost(res.data)
            })
            .catch(e => {
                console.log('e', e)
            })
    }

    return (
        <ViewerContainer>
            <MyViewer
                username={username}
                post={post}
            />
        </ViewerContainer>
    )
}

export default Post

const ViewerContainer = styled.div`
    width: 70%;
    margin: 0 auto;
    background-color: white;
`