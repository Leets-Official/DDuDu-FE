import './App.css';
import './calendarStyle.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useReducer, useRef, useState } from 'react';

import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

//components

const reducer = (state, action) => {

  let newState = [];

  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      if (state.length === 1 && state[0].id === action.targetId) {
        // 만약 항목이 1개이고 해당 항목을 삭제해야 한다면, 빈 배열을 반환
        newState = [];
      } else {
        // 그 외의 경우는 filter를 사용하여 삭제된 새로운 배열을 생성
        newState = state.filter((it) => it.id !== action.targetId);
      }
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
export const LoginContext = React.createContext();

const dummyData = [
  // {
  //   id: 1,
  //   content: 1,
  //   completed: true,
  //   date: 1699456048314,
  // },
  // {
  //   id: 2,
  //   content: 2,
  //   completed: false,
  //   date: 1699456048315,
  // },
  // {
  //   id: 3,
  //   content: 3,
  //   completed: true,
  //   date: 1699456048316,
  // },
]


function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);
  const [logined, setLogined] = useState(false);
  const dataId = useRef(0);
  const onCreate = (date, content) => {
    dispatch({
      type: "CREATE", data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        completed: false,
      }
    })
    dataId.current++;
  }

  const onDelete = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }

  const onEdit = (targetId, date, content, completed) => {
    dispatch({
      type: "EDIT", data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        completed,
      }
    })
  }

  const onLogin = () => {
    if (!logined) {
      setLogined(!logined);
    }
  }

  const onLogout = () => {
    if (logined) {
      setLogined(!logined);
    }
  }

  const warningLogin = () => {
    window.confirm("로그인이 필요합니다");
  }




  return (
    <DiaryStateContext.Provider value={{ data, logined }}>
      <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onEdit }}>
        <LoginContext.Provider value={{onLogin, onLogout, warningLogin}}>
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/diary/:id" element={<Diary />} />
                <Route path="/new" element={<New />} />
              </Routes>
            </div>
          </BrowserRouter>
        </LoginContext.Provider>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
