import React from 'react'
import CommentWrite from "./CommentWrite";
import {useSelector} from "react-redux";
import _ from "lodash";
import {Comment} from "antd";
import CustomComment from "./CustomComment";

const CommentsBlock = (props) => {
    const {post} = props
    const user = useSelector(state => _.get(state, 'user.value'))

    return (
        <>
            {user.signed ?
                <CommentWrite
                    user={user}
                    post={post}
                /> : null
            }
            <CustomComment/>
        </>
    )
}

export default CommentsBlock