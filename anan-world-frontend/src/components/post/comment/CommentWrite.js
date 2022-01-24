import React from 'react'
import {Button, Input} from "antd";
import styled from "styled-components";
import _ from "lodash";
import postAPI from "../../../api/postAPI";


const CommentWrite = (props) => {
    const { user, post, read } = props
    const { TextArea } = Input
    const comment = {writerId: user.id, commentContent: '', postId: post.postId}

    const commentOnChange = (e) => {
        comment.commentContent = _.get(e, 'target.value')
    }

    const handleComment = async () => {
        if (_.isEmpty(_.trim(comment.commentContent)))
            return
        const res = await postAPI.comment(comment);
        if(_.isEqual(res.status, 200))
            read()
    }

    return (
        <Container>
            <TextArea
                placeholder={'의견을 남겨 주세요'}
                onChange={commentOnChange}
            />
            <Button onClick={handleComment}>댓글 작성</Button>
        </Container>
    )
}

export default CommentWrite

const Container = styled.div`
    text-align: right;
    & Button {
        margin: 1rem 0;
    }
`