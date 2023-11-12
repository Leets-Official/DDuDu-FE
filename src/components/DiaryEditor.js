import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import { useContext, useEffect, useRef, useState } from "react";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const emotionList = [
    {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '완전 좋음'
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: '좋음'
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: '그럭저럭'
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: '나쁨'
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: '끔찍함'
    },
]

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10)
}

const DiaryEditor = ({isEdit, originData}) => {
    const contentRef = useRef();
    const navigate = useNavigate();
    const [date, setDate] = useState(getStringDate(new Date()));
    const [content, setContent] = useState("");

    const {onCreate, onEdit, onDelete} = useContext(DiaryDispatchContext);

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return ;
        }

        if (window.confirm(isEdit ? "정말 일기 수정하시나요?" : "정말 새로운 일기 작성하시나요?")) {
            if (!isEdit) {
                onCreate(date, content);
            } else {
                onEdit(originData.id, date, content);
            }
        }
        navigate('/', {replace: true});
    }

    const handleDelete = () => {
        if (window.confirm("정말 정말 삭제하시나요?")) {
            onDelete(originData.id);
            navigate('/', {replace: true});
        }
    }

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setContent(originData.content);
        }
    }, [isEdit, originData])

    return <div className="DiaryEditor">
        <MyHeader headText={isEdit ? "일기 수정하기" : '새로운 일기 쓰기'}
            leftChild={<MyButton text={'< 뒤로가기'} onClick={() => { navigate(-1) }} />} 
            rightChild={isEdit ? 
                <MyButton text={'삭제하기'} type={'negative'} onClick={handleDelete} />:
                null }/>
        <div>
            <section>
                <h4>New DDuDu Date</h4>
                <div className="input_box">
                    <input className="input_date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} />
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className="input_box text_wrapper">
                    <textarea placeholder="오늘은 어땠어?" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
            </section>
            <section>
            <div className="control_box">
                        <MyButton text={'취소하기'} onClick={() => navigate(-1)} />
                        <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
                    </div>
            </section>
        </div>
    </div>
}

export default DiaryEditor;