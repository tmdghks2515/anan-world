import React, {useEffect, useState} from 'react'
import CommentWrite from "./CommentWrite";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import CustomComment from "./CustomComment";
import {Button} from "antd";
import postAPI from "../../../api/postAPI";
import {setPost} from "../../../slices/form/post";

const CommentsBlock = (props) => {
    const {post, load} = props
    const user = useSelector(state => _.get(state, 'user.value'))

    return (
        <>
            {user.signed ?
                <CommentWrite
                    user={user}
                    post={post}
                    load={load}
                /> : null
            }
            {post.comments && post.comments.map(comment =>
                <CustomComment
                    key={_.get(comment, 'commentId')}
                    comment={comment}
                />
            )}
        </>
    );
}

export default CommentsBlock