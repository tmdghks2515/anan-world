import React, {useEffect, useState} from "react";
import postAPI from "../api/postAPI";
import PostCard from "../components/post/PostCard";
import styled from "styled-components";

const Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        postAPI.list({})
            .then(res => {
                setPosts(res.data)
            })
            .catch(e => console.log('error', e))
    }, [])

    return (
        <HomeContainer>
            {posts.map(post => {
                return(
                    <PostCard
                        key={post.postId}
                        post={post}
                    />
                )
            })}
        </HomeContainer>
    )
}

export default Home

const HomeContainer = styled.div`
    text-align: center;
`