import React, {createElement, useEffect, useState} from 'react'
import {Avatar, Comment, Tooltip} from "antd";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment";
import _ from "lodash";


const CustomComment = (props) => {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [comment, setComment] = useState({});

    useEffect(() => {
        setComment(props.comment)
    }, [])

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
        <>
            <Comment
                actions={actions}
                content={_.get(comment, 'commentContent')}
                author={_.get(comment, 'writerId')}
                avatar={<Avatar size={42} icon={<UserOutlined />} />}
                datetime={
                    <Tooltip title={moment(_.get(comment, 'createdAt')).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(_.get(comment, 'createdAt')).fromNow()}</span>
                    </Tooltip>
                }
            />
        </>
    )
}

export default CustomComment