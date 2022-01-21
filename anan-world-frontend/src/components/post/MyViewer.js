import React from 'react'
import {Viewer} from "@toast-ui/react-editor";
import styled from "styled-components";
import {TagsFilled} from "@ant-design/icons";
import {Tag} from "antd";
import {Link} from "react-router-dom";
import _ from "lodash";
import moment, {now} from "moment";
import Utils from "../../utils/Utils";

const MyViewer = (props) => {
    const  { post } = props
    const tags =  post.tags

    return (
        <>
            <Title>
                {post.postTitle}
            </Title>
            <Info>
                {post.writerName + ` · ` + Utils.getDateDiff(post.createdAt)}
            </Info>
            {_.size(tags) > 0 ?
            <Tags>
                <TagsFilled/>
                {post.tags.map(tag =>
                    <Tag key={tag.tagName}>
                        <Link to={'/'}>{tag.tagName}</Link>
                    </Tag>
                )}
            </Tags> : null
            }
            {post.postContent ?
                <Viewer
                    initialValue={post.postContent}
                />
            : ''}
        </>
    );
}

export default MyViewer

const Title = styled.p`
    font-size: 3rem;
    margin: 1rem 0 0.2rem 0;
    color: #343a40;
    `
const Info = styled.p`
    margin-bottom: 1rem;
    color: #212529;
`
const Tags = styled.p`
    margin-bottom: 3rem;
    & :first-child {
        margin-right: 0.5rem;
    }
`