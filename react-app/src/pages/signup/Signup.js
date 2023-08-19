//libraries
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

// thunk
import { signUp } from '../../store/session'

const Signup = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  if(sessionUser) return <Redirect to='/'/>


  return (
    <div className='register'>

    </div>
  )
}

export default Signup
