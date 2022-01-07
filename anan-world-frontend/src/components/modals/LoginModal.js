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
            message.success('회원가입 성공');
            setSignUpMode(false);
        } else {
            message.error(_.get(res, 'data.message'))
        }
    }

    const handleLogin = () => {

    }

    const onFinishFailed = (values) => {

    }

    const validateMessages = {
        required: '필수 값 입니다',
        types: {
            email: '이메일 형식이 아닙니다'
        }
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
                            validateMessages={validateMessages}
                        >
                            <Form.Item name={'username'}
                                rules={[
                                    {
                                        required: true,
                                    }
                                ]}
                            >
                                <Input placeholder={"아이디"}/>
                            </Form.Item>
                            <Form.Item name={'password'}
                                   rules={[
                                       {
                                           required: true,
                                       },
                                       ({}) => ({
                                           validator(_, value) {
                                               const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
                                               if (!value || check.test(value)) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject(new Error('영문+숫자+특수문자 10자리 이상'));
                                           },
                                       }),
                                   ]}
                            >
                                <Input.Password placeholder={"비밀번호"}/>
                            </Form.Item>
                            <Form.Item name={'confirm'}
                                       dependencies={['password']}
                                       hasFeedback
                                       rules={[
                                           {
                                               required: true,
                                           },
                                           ({ getFieldValue }) => ({
                                               validator(_, value) {
                                                   if (!value || getFieldValue('password') === value) {
                                                       return Promise.resolve();
                                                   }
                                                   return Promise.reject(new Error('비밀번호 불일치'));
                                               },
                                           }),
                                       ]}

                            >
                                <Input.Password placeholder={"비밀번호 확인"}/>
                            </Form.Item>
                            <Form.Item name={'name'}
                                   rules={[
                                       {
                                           required: true,
                                       }
                                   ]}
                            >
                                <Input placeholder={"이름"}/>
                            </Form.Item>
                            <Form.Item name={'email'}
                                   rules={[
                                       {
                                           required: true,
                                           type: 'email'
                                       }
                                   ]}
                            >
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
                            validateMessages={validateMessages}
                        >
                            <Form.Item name={'username'}
                                   rules={[
                                       {
                                           required: true,
                                       }
                                   ]}
                            >
                                <Input placeholder={"아이디"}/>
                            </Form.Item>
                            <Form.Item name={'password'}
                                   rules={[
                                       {
                                           required: true,
                                       }
                                   ]}
                            >
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

