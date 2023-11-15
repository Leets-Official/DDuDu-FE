import { useContext, useEffect, useState, useRef } from "react";
import { DiaryStateContext } from "../App";

import Calendar from "react-calendar";
import moment from 'moment';

import MyHeader from './../components/MyHeader';
import DiaryList from './../components/DiaryList';
import MyMenu from "../components/MyMenu";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";

const Home = () => {

    const state = useContext(DiaryStateContext);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const [isVisibleCalendar, setIsVisibleCalendar] = useState(false);

    const modalBackground = useRef();

    useEffect(() => {
        if (state.data.length == 0) {
            setData([]);
        } else if (state.data.length >= 1) {

            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                curDate.getDate(),
                0
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                curDate.getDate() + 1,
                0
            ).getTime();
            setData(state.data.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
    }, [state.data, curDate])

    useEffect(() => {
        if (!localStorage.getItem('name')) {
            window.alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, []);

    const handleCalendar = () => {
        setIsVisibleCalendar(!isVisibleCalendar);
    }

    return <>
        <MyHeader headText={'DDuDu List'}
            leftChild={localStorage.getItem('name')} rightChild={<MyMenu />} />
        <MyHeader headText={moment(curDate).format().slice(0, 10)}
            rightChild={<MyButton text={'변경'} onClick={handleCalendar} />} />
            {isVisibleCalendar &&
                <div className="modal-container" ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setIsVisibleCalendar(false);
                    }
                }}>
                    <div className="modal-content">
                        < Calendar
                            onChange={setCurDate}
                            value={curDate}
                            next2Label={null}
                            prev2Label={null}
                            formatDay={(locale, date) => moment(date).format('D')}
                            showNeighboringMonth={false}
                            onActiveStartDateChange={({ activeStartDate}) =>
                                setCurDate(activeStartDate)
                            }
                        />
                    </div>
                </div>
            }
        <DiaryList diaryList={data} curDate={curDate} />
    </>
}



export default Home;