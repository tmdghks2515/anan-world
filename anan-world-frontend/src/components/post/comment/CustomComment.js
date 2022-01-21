import React from 'react'
import {Avatar, Comment, Tooltip} from "antd";
import {UserOutlined} from "@ant-design/icons";
import moment from "moment";

const CustomComment = (comment) => {
    comment = {commentContent: 'dasdasfdsdfafdasfsdfasf!!!', writerId: 3, createdAt: '2022-01-21'}
    moment.locale('ko')

    return (
        <>
            <Comment
                content={comment.commentContent}
                author={comment.writerId}
                avatar={<Avatar size={42} icon={<UserOutlined />} />}
                datetime={
                    <Tooltip title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(comment.createdAt).fromNow()}</span>
                    </Tooltip>
                }
            />
        </>
    )
}

export default CustomComment