// libraries
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, NavLink} from 'react-router-dom/cjs/react-router-dom.min'

// thunk
import {signUp} from '../../store/session'

// style
import './Signup.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  // state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState([]);

  if (sessionUser)
    return <Redirect to='/'/>



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  }
  return((
    <div className='register'>

      <div className="signUpWrapper">
        <div className="signUpLeft">
          <p className='signUpDesPrimary'>
            <b className='signUpDesPrimaryBold'>Hi I'm </b>
            <big className='signUpDesPrimaryBig'>
              Course Correct
            </big>
            the AI tutoring platform that helps you
            prepare for your exams.
          </p>

          <p className="signUpDesSecondary">
            We offer interactive execises, and real-time feedback to help
            you master your coursework. Our AI tutors are available
            24/7 to answer your questions and help you stay on track.
          </p>

          <img src="images/LoginLogo.png" alt="signUp logo" className="signUpLogo"/>

        </div>

        <div className="signUpRight">

          <div className="signUpBox">

            <div className="signUpFormBox">
              <form onSubmit={handleSubmit}
                className="signUpForm">
                <div className=''>
                  <h2 className='signUpBottomBoxHeading'>Create your account</h2>
                  <p className='signUpgBottomBoxHeadingDes'>
                    Start your free trial today and see how Course
                                            Corrent can help you succeed.
                  </p>

                </div>

                <div className='signUpInputDiv'>

                  <input
                   type="email"
                   className="signUpInput"
                   placeholder='Email'
                   id='email'
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                   />
                </div>

                <div className='signUpInputDiv'>

                  <input
                    type="text"
                    className="signUpInput"
                    placeholder='Username'
                    id='email'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />

                </div>

                {
                showPassword ? (
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

                ) : (

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

                  </div>

                )
              }

                {showConfirmPassword ? (
                  <div className='loginInputDiv'>
                    <LockOutlinedIcon className='loginIcon'/>
                    <input
                      type="text"
                      className="loginInput"
                      placeholder='Password'
                      value={confirmPassword}
                      id='password'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      />
                    <VisibilityOffIcon onClick={() => setShowConfirmPassword(false)} className='loginIcon2'/>
                  </div>

                ) : (

                  <div className='loginInputDiv'>
                    <LockOutlinedIcon className='loginIcon'/>
                    <input
                      type="password"
                      className="loginInput"
                      placeholder='Password'
                      value={confirmPassword}
                      id='password'
                      onChange={(e) => setConfirmPassword(e.target.value) }
                      required
                      />
                    <RemoveRedEyeIcon onClick={() => setShowConfirmPassword(true)} className='loginIcon2'/>
                    </div>

                )
              }

                <button type="submit" className="signUpButton">signUp</button>
                <spam className="toLogin">Have a account
                  <NavLink className='link' to='/login'> Login</NavLink>
                </spam>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default Signup
