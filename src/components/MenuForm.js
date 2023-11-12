import React, { useContext, useState } from 'react';
import { DiaryStateContext } from "../App";
import { DiaryDispatchContext } from "../App";
import MyButton from './MyButton';

const MenuForm = ({onClick, id, content}) => {

    const { onCreate, onEdit, onDelete } = useContext(DiaryDispatchContext);
    const diaryList = useContext(DiaryStateContext);
    const targetDdu = diaryList.data.find((it) => it.id === id)
    const [editContent, setEditContent] = useState(targetDdu.content);
    const handleInput = () => {
        onEdit(targetDdu.id, targetDdu.date, editContent, targetDdu.completed);
        onClick();
    }

    return (
        <div className='DiaryItem'>
            <input type='text' onChange={(e) => setEditContent(e.target.value)} value={editContent}/>
            <MyButton text={'수정 완료'} onClick={handleInput} />
        </div>
    );
};

export default MenuForm;