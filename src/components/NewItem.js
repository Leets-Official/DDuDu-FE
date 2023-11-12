import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from "../App";
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';

const NewItem = ({date, onClick}) => {
    const contentRef = useRef();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const {onCreate, onEdit, onDelete} = useContext(DiaryDispatchContext);
    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return ;
        }

        if (window.confirm("정말 새로운 뚜두 작성하시나요?")) {
            onCreate(date, content);
            onClick();
        }
        navigate('/', {replace: true});
    }

    return (
        <div className="DiaryItem" >
            <input ref={contentRef} type='text' onChange={(e) => {setContent(e.target.value)}} />
            <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
        </div>
    );
};

export default NewItem;