import React, {useEffect} from "react";
import Header from "../components/templates/Header";
import {Card} from "antd";
import Meta from "antd/lib/card/Meta";
import postAPI from "../api/postAPI";

const Home = () => {

    useEffect(() => {
        postAPI.list({})
            .then(r => console.log('then r', r))
            .catch(e => console.log('error e', e))
    }, [])

    return (
        <>
            <Header/>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
        </>
    )
}

export default Home