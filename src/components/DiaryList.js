import React, { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import NewItem from "./NewItem";

const sortOptionList = [
    { value: "not completed", name: "안 한 거 먼저" },
    { value: "completed", name: "한 거 먼저" },
];

const filterOptionList = [
    { value: "all", name: "전부" },
    { value: "not yet", name: "미완료" },
    { value: "completed", name: "완료" },
]

const ControlMenu = ({ value, onChange, optionList }) => {
    return <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)} >
        {optionList.map((it, idx) => <option key={idx} value={it.value}>{it.name}</option>)}
    </select>
}

const DiaryList = ({ diaryList, curDate }) => {

    const [sortType, setSortType] = useState('not completed');
    const [filter, setFilter] = useState('all');
    const [isCreate, setIsCreate] = useState(false);
    const navigate = useNavigate();
    const getProcessedDiaryList = () => {
        const filterCallBack = (item) => {
            if (filter === 'not yet') {
                return item.completed == false;
            }
            else {
                return item.completed == true;
            }
        }

        const compare = (a, b) => {
            // if (sortType === 'latest') {
            //     return parseInt(b.date) - parseInt(a.date);
            // }
            // return parseInt(a.date) - parseInt(b.date);

            if (sortType === 'not completed') {
                if (a.completed !== b.completed) {
                    return (a.completed ? 1 : -1)
                }
            } else if (sortType === 'completed') {
                if (a.completed !== b.completed) {
                    return (a.completed ? -1 : 1)
                }
            }
        }

        const copyList = JSON.parse(JSON.stringify(diaryList));

        const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it))

        const sortedList = filteredList.sort(compare);
        return sortedList;
    }

    const handleCreate = () => {
        setIsCreate(false)
    }

    const handleOutsideClick = (event) => {
        if (isCreate && !event.target.closest(['.right_col', '.create_tool'])) {
            setIsCreate(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isCreate]);

    return (
        <div className="DiaryList">

            <div className="menu_wrapper">
                <div className="left_col">

                    <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
                    <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
                </div>
                <div className="right_col">
                    <MyButton text={'New DDuDu'} onClick={() => setIsCreate(true)} type={'black'} />
                </div>
            </div>
            {diaryList.length != 0 ? getProcessedDiaryList().map((it) =>
                <DiaryItem key={it.id} {...it} />) : null}
            <div className="create_tool">
                {isCreate ?
                    <NewItem date={curDate} onClick={handleCreate} /> : null}
            </div>
        </div>);
};

DiaryList.defautProps = {
    diaryList: [],
};

export default DiaryList;