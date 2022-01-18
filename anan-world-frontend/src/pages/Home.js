import React, {useEffect, useState} from "react";
import Header from "../components/templates/Header";
import {Card, Col, Row, Space} from "antd";
import Meta from "antd/lib/card/Meta";
import postAPI from "../api/postAPI";
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
            <Header/>
            <Row>
            {posts.map(post => {
                return(
                    <Col span={8}>
                        <Card
                            style={{width: 300}}
                            hoverable
                        >
                            <Meta title={post.postTitle} description={post.postContent}/>
                        </Card>
                    </Col>
                )
            })}
            </Row>
        </>
    )
}

export default Home