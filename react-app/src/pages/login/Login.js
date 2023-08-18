// libraries
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, useHistory} from 'react-router-dom/cjs/react-router-dom.min'

// thunk
import {login} from '../../store/session'

// style
import './Login.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()

  // state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  if (sessionUser)
    return <Redirect to='/' />





  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    setPassword('')
    setEmail('')
  }

  return (
  <div className='login'>

    <div className="loginWrapper">
      <div className="loginLeft">
      <p className='loginDesPrimary'>
      <b className='loginDesPrimaryBold'>Hi I'm</b>
      <big className='loginDesPrimaryBig'> Course Corrent </big>
      the AI tutoring platform that helps you
       prepare for your exams.
      </p>

      <p className="loginDesSecondary">
        We offer interactive execises, and real-time feedback to help
        you master your coursework. Our AI tutors are available
        24/7 to answer your questions and help you stay on track.
      </p>

      <img
      src="images/LoginLogo.png"
      alt="login logo"
      className="loginLogo"
      />

      </div>

      <div className="loginRight">

        <div className="loginBox">

          <div className="bottom">
            <form onSubmit={handleSubmit} className="bottomBox">
              <div>
                  <h2 className='bottomBoxHeading'>Create your account</h2>
                  <p className='bottomBoxHeadingDes'>
                    Start your free trial today and see how Course
                    Corrent can help you succeed.
                  </p>

              </div>

              <input
              type="email"
              className="loginInput"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              required/>

              <input
              type="password"
              className="loginInput"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />

              <button type="submit" className="loginButton">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default Login
