import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
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

const Diary = () => {
    const getStringDate = (date) => {
        return date.toISOString().slice(0, 10)
    }

    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert("없는 일기입니당");
                navigate('/', {replace: true});
            }
        }


    }, [id, diaryList])

    if (!data) {
        return <div className="DiaryPage">로딩중입니다..</div>
    } else {
        const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === data.emotion)
        return (
            <div className="DiaryPage">
                <MyHeader headText={`${getStringDate(new Date(data.date))} 기록`}
                leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
                 rightChild={<MyButton text={'수정하기'} onClick={() => navigate(`/edit/${data.id}`)} />} />
                 <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={curEmotionData.emotion_img} />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                 </article>
            </div>
        )
    }
}

export default Diary;