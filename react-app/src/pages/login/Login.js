// libraries
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, Redirect, useHistory} from 'react-router-dom/cjs/react-router-dom.min'

// thunk
import {login} from '../../store/session'

// style
import './Login.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()

  // state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
          <big className='loginDesPrimaryBig'> Course Correct </big>
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

      <div className="row">

        <div className="loginBox">

          <div className="loginFormBox">
            <form onSubmit={handleSubmit} className="loginForm">
              <div className=''>
                  <h2 className='loginBottomBoxHeading'>Login to your account</h2>
                  <p className='logingBottomBoxHeadingDes'>
                    Start your free trial today and see how Course
                    Corrent can help you succeed.
                  </p>

              </div>

              <div className='loginInputDiv'>
              <PersonOutlineOutlinedIcon className='loginIcon'/>
              <input
              type="email"
              className="loginInput"
              placeholder='Email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
              </div>

              {showPassword?

              (
              <div className='loginInputDiv'>
              <LockOutlinedIcon className='loginIcon'/>
              <input
              type="text"
              className="loginInput"
              placeholder='Password'
              value={password}
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              required
              />
              <VisibilityOffIcon onClick={() => setShowPassword(false)} className='loginIcon2'/>
              </div>

              ):(

              <div className='loginInputDiv'>
              <LockOutlinedIcon className='loginIcon'/>
              <input
              type="password"
              className="loginInput"
              placeholder='Password'
              value={password}
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              required
              />
              <RemoveRedEyeIcon onClick={() => setShowPassword(true)} className='loginIcon2'/>
               {/* <label htmlFor="password" className="loginLabel">Password</label> */}
              </div>

              )}

              <button type="submit" className="loginButton">Login</button>
            <spam className="toSignUp">Don't have an account <NavLink className='link' to='/register'>Sign up</NavLink></spam>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default Login
