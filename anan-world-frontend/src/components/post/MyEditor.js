import React, {createRef, useEffect} from 'react'
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import chart from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import styled from "styled-components";
import {Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {clearPost, setContent, setTags, setTitle, setWriter} from "../../slices/form/post";

const MyEditor = () => {

    const post = useSelector(state => _.get(state, 'post.value'))
    const user = useSelector(state => _.get(state, 'user.value'))
    const dispatch = useDispatch()
    const editorRef = createRef()

    useEffect(() => {
        dispatch(clearPost())
        dispatch(setWriter(user))
    }, [])

    const editorOnChangeHandler = () => {
        if (_.get(editorRef, 'current')) {
            const content  = editorRef.current.getInstance().getMarkdown()
            dispatch(setContent(content));
        }
    }

    const titleOnChangeHandler = (data) => {
        const title = _.get(data, 'target.value')
        if(title)
            dispatch(setTitle(title))
        console.log('post!!', post)
    }

    const tagsOnChangeHandler = (data) => {
        if(data)
            dispatch(setTags(data))
        console.log('post!!', post)
    }

    return (
        <>
            <HeaderInput
                placeholder="제목을 입력하세요 "
                bordered={false}
                onChange={data => titleOnChangeHandler(data)}
            />
            <Select
                placeholder="태그를 입력하세요 "
                mode={'tags'}
                bordered={false}
                style={{width: '100%', height:'5vh'}}
                dropdownStyle={{visibility: false, visible: false}}
                allowClear={true}
                onChange={data => tagsOnChangeHandler(data)}
            />
            <Editor
                plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                previewStyle='vertical'
                placeholder={'당신의 스토리를 작성하세요 .. '}
                height={'76vh'}
                useCommandShortcut={true}
                onChange={editorOnChangeHandler}
                ref={editorRef}
            />
        </>
    )
}

export default MyEditor

const HeaderInput = styled(Input)`
    height: 10vh;
    font-size: 30px;
`
