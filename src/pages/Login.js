import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import MyHeader from '../components/MyHeader';
import MyButton from './../components/MyButton';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const axiosData = async () => {
    const response = await axios.get('https://43.201.114.147:8080/login');
    console.log(response)
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length < 1) {
      window.alert('이메일을 입력해주세요.')
      emailRef.current.focus();
      return ;
    }
    if (password.length < 1) {
      window.alert('패스워드를 입력해주세요.')
      passwordRef.current.focus();
      return ;
    }

    const loginToken = await axios.post('http://43.201.114.147:8080/login', { email, password });
    localStorage.setItem('access', loginToken.data.accessToken);
    localStorage.setItem('refresh', loginToken.data.refreshToken);
    localStorage.setItem('name', loginToken.data.username);
    navigate('/');
  }

  return (
    <>
      <MyHeader headText={'DDuDu List'} rightChild={<MyButton text={'회원가입'} onClick={() => navigate('/signup')} />} />
      <div className='Login'>
        <h1>로그인</h1>
        <section>
          <h4>EMAIL</h4>
          <input ref={emailRef} type='text' name='email' onChange={(e) => { setEmail(e.target.value) }} />
        </section>
        <section>
          <h4>PASSWORD</h4>
          <input ref={passwordRef} type='password' name='password' onChange={(e) => { setPassword(e.target.value) }} />
        </section>
        <button onClick={handleSubmit} type='submit'>로그인</button>
      </div>
    </>
  )
}

export default Login;