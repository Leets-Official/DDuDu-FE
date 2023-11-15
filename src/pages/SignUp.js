import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import axios from 'axios';
import { useState } from 'react';

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [checkDup, setCheckDup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "" && username !== "" && checkDup === true) {
      const signUpResponse = await axios.post('http://43.201.114.147:8080/signup', { email, password, username });
      console.log(signUpResponse)
      if (signUpResponse.data === 'Success') {
        window.alert('회원가입이 완료되었습니다');
        navigate('/login');
      }
    }
  }

  const handleDuplication = async (e) => {
    e.preventDefault();
    const duplicationResponse = await axios.post('http://43.201.114.147:8080/signup/email-check', { email });
    if (duplicationResponse.data) {
      window.alert('아이디가 중복입니다 :(')
    } else {
      window.alert('중복 체크 완료 :)')
      setCheckDup(true);
    }
  }


  return (
    <>
      <MyHeader headText={'DDuDu List'} leftChild={<MyButton text={'취소'} type={'negative'} onClick={() => navigate(-1)} />} />
      <div className='Login'>
        <h1>회원가입</h1>
        <section>
          <h4>EMAIL</h4>
          <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
        </section>
        <button onClick={handleDuplication}>중복 확인</button>
        <section>
          <h4>PASSWORD</h4>
          <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
        </section>
        <section>
          <h4>USERNAME</h4>
          <input type='text' name='username' onChange={(e) => setUsername(e.target.value)} />
        </section>
        <button onClick={handleSubmit}>회원가입</button>
      </div>
    </>
  )
}

export default SignUp