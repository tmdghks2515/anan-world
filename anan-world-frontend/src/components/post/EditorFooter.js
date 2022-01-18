import React from 'react'
import styled from "styled-components";
import {CustomButton} from "../../static/styles/buttons";
import {ArrowLeftOutlined, CheckCircleTwoTone, ExclamationCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {write} from "../../slices/form/post";
import {notification, Popconfirm} from "antd";

const EditorFooter = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const post = useSelector(state => _.get(state, 'post.value'))

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleWritePost = async () => {

        const res = await dispatch(write(post))
        console.log('front res', res)
        if (_.isEqual(_.get(res, 'meta.requestStatus'), 'fulfilled')) {
            notification.open({
                message: <>
                    <CheckCircleTwoTone twoToneColor="#52c41a" />&nbsp;&nbsp; 포스트 작성 성공
                </>,
            })
        } else {
            notification.open({
                message: <>
                    <ExclamationCircleOutlined style={{color: 'red'}}/>&nbsp;&nbsp; 포스트 작성 실패
                </>,
                description: ''
            })
        }
    }

    return (
        <DesignedEditorFooter>
            <CustomButton
                onClick={handleGoBack}
                type={'text'}
            >
                <ArrowLeftOutlined /> 나가기
            </CustomButton>
            <Popconfirm
                title={'작성 하시겠습니까?'}
                onConfirm={handleWritePost}
                okText={'예'}
                cancelText={'아니오'}
            >
                <CustomButton
                    type={'primary'}
                    className={'registerBtn'}
                >
                    작성하기
                </CustomButton>
            </Popconfirm>
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