import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <>
      <MyHeader headText={'DDuDu List'} leftChild={<MyButton text={'취소'} type={'negative'} onClick={() => navigate(-1)} />} />
      <div className='Login'>
        <h1>회원가입</h1>
        <form method='post'>
          <section>
            <h4>EMAIL</h4>
            <input type='text' name='email' />
          </section>
          <section>
            <h4>PASSWORD</h4>
            <input type='text' name='password' />
          </section>
          <section>
            <h4>USERNAME</h4>
            <input type='text' name='username' />
          </section>
          <button>회원가입</button>
        </form>
      </div>
    </>
  )
}

export default SignUp