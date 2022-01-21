import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import postAPI from "../api/postAPI";
import PostCard from "../components/post/PostCard";
import _ from "lodash";

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
        <>
            <Row>
            {posts.map(post => {
                return(
                    <Col span={6} key={_.get(post, 'postId')}>
                        <PostCard post={post}/>
                    </Col>
                )
            })}
            </Row>
        </>
    )
}

export default Home