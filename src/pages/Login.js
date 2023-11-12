import React from 'react'
import { useNavigate } from 'react-router-dom';
import MyHeader from '../components/MyHeader';
import MyButton from './../components/MyButton';

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <MyHeader headText={'DDuDu List'} rightChild={<MyButton text={'회원가입'} onClick={() => navigate('/signup')} />} />
      <div className='Login'>
        <h1>로그인</h1>
        <form method='post'>
          <section>
            <h4>EMAIL</h4>
            <input type='text' name='email' />
          </section>
          <section>
            <h4>PASSWORD</h4>
            <input type='text' name='password' />
          </section>
          <button>로그인</button>
        </form>
      </div>
    </>
  )
}

export default Login;