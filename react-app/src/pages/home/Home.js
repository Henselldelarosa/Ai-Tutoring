import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import QuestionAnswer from '../../components/questionAnswer/QuestionAnswer'
import Questions from '../../components/questions/Questions'
import './Home.css'
import QuestionModalRender from '../../components/questionModal/QuestionModalRender'
function Home() {
  const sessionUser = useSelector(state => state.session.user)

  const [showModal, setshowModal] = useState(false)
  if(!sessionUser) return <Redirect to='/login'/>
  return (
    <div className='home'>
      <h2 className="homeHeader HeaderSecondary">
          Course Correct
      </h2>
      <div className="home__wrapper">
      <QuestionAnswer/>

      {/* {showModal && (
        <QuestionModalRender/>
      )} */}
      </div>
      {/* <div className="home__hr">
      <hr className='hr'/> <p className='hr__or'>OR</p> <hr className='hr'/>
      </div> */}



    </div>
  )
}

export default Home
