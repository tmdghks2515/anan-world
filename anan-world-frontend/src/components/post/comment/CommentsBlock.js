import React from 'react'
import CommentWrite from "./CommentWrite";
import {useSelector} from "react-redux";
import _ from "lodash";
import CustomComment from "./CustomComment";

const CommentsBlock = (props) => {
    const {post, read} = props
    const user = useSelector(state => _.get(state, 'user.value'))

    return (
        <>
            {user.signed ?
                <CommentWrite
                    user={user}
                    post={post}
                    read={read}
                /> : null
            }
            {post.comments && post.comments.map(comment =>
                <CustomComment
                    key={_.get(comment, 'commentId')}
                    comment={comment}
                />
            )}
        </>
    )
}

export default CommentsBlock