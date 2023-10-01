import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import QuestionAnswer from '../../components/questionAnswer/QuestionAnswer'

function Home() {
  const sessionUser = useSelector(state => state.session.user)

  if(!sessionUser) return <Redirect to='/login'/>
  return (
    <div>
      <QuestionAnswer/>
    </div>
  )
}

export default Home
