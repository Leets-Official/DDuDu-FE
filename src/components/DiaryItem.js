import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { DiaryStateContext } from "../App";
import { DiaryDispatchContext } from "../App";
import React, { useContext, useState } from "react";
import MenuForm from "./MenuForm";

const DiaryItem = ({ id, completed, content, date }) => {

    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const navigate = useNavigate();
    const diaryList = useContext(DiaryStateContext);
    const { onCreate, onEdit, onDelete } = useContext(DiaryDispatchContext);
    const [isSubMenuVisible, setSubMenuVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const toggleSubMenu = () => {
        setSubMenuVisible(!isSubMenuVisible);
    };

    const handleCheckbox = () => {
        const targetDdu = diaryList.data.find((it) => it.id === id)
        onEdit(targetDdu.id, targetDdu.date, targetDdu.content, !(targetDdu.completed));
    }

    const handleOutsideClick = (event) => {
        if (isSubMenuVisible && !event.target.closest('.ddudu_button')) {
            setSubMenuVisible(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isSubMenuVisible]);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleDelete = () => {
        if (window.confirm("정말 해당 뚜두 삭제하시나요?")) {
            onDelete(id);
        }
    }

    const handleOutsideClick2 = (event) => {
        if (isEdit && !event.target.closest(['.MenuForm', '.submenu'])) {
            setIsEdit(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick2);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('click', handleOutsideClick2);
        };
    }, [isEdit]);

    return (
        <>
            <div className="DiaryItem" >
                <div className="item_checkbox">
                    <input type="checkbox" onClick={handleCheckbox} checked={completed} />
                </div>
                <div className="info_wrapper">
                    <div className="diary_content_preview">
                        {content}
                    </div>
                </div>
                {isSubMenuVisible && (
                    <div className="submenu">
                        <button onClick={handleEdit}>수정</button>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                )}
                <div className="btn_wrapper">
                    <button onClick={toggleSubMenu} className="ddudu_button">. . .</button>
                </div>
            </div>
            <div className="MenuForm">
                {isEdit && <MenuForm id={id} content={content} onClick={handleEdit} />}
            </div>
        </>
    );
}

export default DiaryItem;