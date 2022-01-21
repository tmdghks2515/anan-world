import React from 'react'
import {Button, Input} from "antd";
import styled from "styled-components";
import _ from "lodash";
import postAPI from "../../../api/postAPI";


const CommentWrite = (props) => {
    const { user, post } = props
    const { TextArea } = Input
    const comment = {writerId: user.id, commentContent: '', postId: post.postId}

    const commentOnChange = (e) => {
        comment.commentContent = _.get(e, 'target.value')
    }

    const handleComment = async () => {
        if (_.isEmpty(_.trim(comment.commentContent)))
            return
        const res = await postAPI.comment(comment);
        console.log('res', res)
    }

    return (
        <CWContainer>
            <TextArea
                placeholder={'의견을 남겨 주세요'}
                onChange={commentOnChange}
            />
            <Button onClick={handleComment}>댓글 작성</Button>
        </CWContainer>
    )
}

export default CommentWrite

const CWContainer = styled.div`
    text-align: right;
    & Button {
        margin: 1rem 0;
    }
`