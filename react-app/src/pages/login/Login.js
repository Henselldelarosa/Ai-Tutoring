// libraries
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, useHistory} from 'react-router-dom/cjs/react-router-dom.min'

// thunk
import {login} from '../../store/session'

// style
import './Login.css'

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
      <h3 className="loginLogo">AI Tutorial</h3>

      </div>

      <div className="loginRight">

        <div className="loginBox">

          <div className="bottom">

            <form onSubmit={handleSubmit} className="bottomBox">

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
