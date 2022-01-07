import React, {useState} from 'react'
import {Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {close} from "../../slices/modals/loginModal";
import {CustomModal} from "../../static/styles/modals";
import {CustomButton} from "../../static/styles/buttons";
import userAPI from "../../api/userAPI";
import _ from "lodash";

const LoginModal = (props) => {

    const dispatch = useDispatch()
    const [signUpMode, setSignUpMode] = useState(false)
    const visible = useSelector((state) => state.loginModalVisible.value)

    const title = signUpMode ? '회원가입' : '로그인'

    const handleCancel = () => {
        setSignUpMode(false)
        dispatch(close())
    }

    const handleOK = () => {
        dispatch(close())
    }

    const handleRegister = async (data) => {
        const res = await userAPI.register(data)
        if (_.isEqual(res.status, 200)) {
            message.success('회원가입 성공')
            setSignUpMode(false)
        }
        console.log('res', res);
    }

    const handleLogin = () => {

    }

    const onFinishFailed = (values) => {

    }

    const footer =
        signUpMode ?
        <a onClick={ () => setSignUpMode(false) }>로그인</a> :
        <>
            아직 회원이 아니신가요? <a onClick={ () => setSignUpMode(true) }>회원가입</a>
        </>

    return (
        <>
            <CustomModal
                title={ title }
                visible={ visible }
                onOk={ handleOK }
                onCancel={ handleCancel }
                footer={ footer }
            >
                {
                    signUpMode ?
                        <Form
                            autoComplete={'off'}
                            onFinish={handleRegister}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item name={'username'}>
                                <Input placeholder={"아이디"}/>
                            </Form.Item>
                            <Form.Item name={'password'}>
                                <Input type={'password'} placeholder={"비밀번호"}/>
                            </Form.Item>
                            <Form.Item name={'pwCheck'}>
                                <Input type={'password'} placeholder={"비밀번호 확인"}/>
                            </Form.Item>
                            <Form.Item name={'name'}>
                                <Input placeholder={"이름"}/>
                            </Form.Item>
                            <Form.Item name={'email'}>
                                <Input placeholder={"이메일"}/>
                            </Form.Item>
                            <CustomButton
                                width={'100%'}
                                type="primary"
                                htmlType="submit"
                            >
                                가입
                            </CustomButton>
                        </Form> :
                        <Form
                            onFinish={handleLogin}
                        >
                            <Form.Item name={'username'}>
                                <Input placeholder={"아이디"}/>
                            </Form.Item>
                            <Form.Item name={'password'}>
                                <Input type={"password"} placeholder={"비밀번호"}/>
                            </Form.Item>
                            <CustomButton type={'primary'} width={'100%'}>로그인</CustomButton>
                        </Form>
                }
            </CustomModal>
        </>
    )
}

export default LoginModal

