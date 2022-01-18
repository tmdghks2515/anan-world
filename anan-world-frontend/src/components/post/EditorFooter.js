import React from 'react'
import styled from "styled-components";
import {CustomButton} from "../../static/styles/buttons";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {write} from "../../slices/form/post";

const EditorFooter = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const post = useSelector(state => _.get(state, 'post.value'))
    const user = useSelector(state => _.get(state, 'user.value'))

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleWritePost = () => {

        dispatch(write(post))
    }

    return (
        <DesignedEditorFooter>
            <CustomButton
                onClick={handleGoBack}
                type={'text'}
            >
                <ArrowLeftOutlined /> 나가기
            </CustomButton>
            <CustomButton
                type={'primary'}
                className={'registerBtn'}
                onClick={handleWritePost}
            >
                작성하기
            </CustomButton>
        </DesignedEditorFooter>
    )
}

export default EditorFooter


const DesignedEditorFooter = styled.div`
    width: 100%;
    height: 5vh;
    padding: 2vh 0;
    & .registerBtn {
        float: right;
    }
`