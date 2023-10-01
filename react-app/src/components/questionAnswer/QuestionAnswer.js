import React from 'react'

// style
import './QuestionAnswer.css'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import QuestionAnswerInput from './QuestionAnswerInput';

const QuestionAnswer = () => {
  return (
    <div className='questionAnswer'>
      <div className="questionAnswerWrapper">
        <h2 className="questionAnswerHeader HeaderSecondary">
          Course Correct
        </h2>

        <div className="questionAnswerCenter">
          <div className="questionAnswerTop">

          <h3 className="questionAnswerBoxHeading headerTertiary">
            Revise quickly with your Ai assistant
          </h3>

          <span className="questionAnswerCounter">
            <b className='counter'>10/10</b> <p>Question left</p>
          </span>
          </div>
        </div>

        <div className="questionAnswerSubjectBox row">
          <p className="questionAnswerDescription">
            select a subject and a difficulty, then click the "Generate Question"
            button for a question. Solve it, check your answers with the 'Answer'
            button.
          </p>

        <div className="questionAnswerSubjectBoxSelect">

          <div className="col-1-of-3">

            <div className="questionAnswerSubject">

            <div className="centerItems">
                <CalculateOutlinedIcon
                className='questionAnswerSubjectIcon'
                style={{fontSize:'3rem'}}/>
                <p className="questionAnswerSubjectHeading">Mathematics</p>
            </div>

            </div>

          </div>

          <div className="col-1-of-3">
            <div className="questionAnswerSubject">
              <div className="centerItems">

                <ScienceOutlinedIcon
                className='questionAnswerSubjectIcon'
                style={{fontSize:'3rem'}}/>
                <p className="questionAnswerSubjectHeading">Chemistry</p>
              </div>

            </div>
          </div>

          <div className="col-1-of-3">
            <div className="questionAnswerSubject">

                <div className="centerItems">
                  <BiotechOutlinedIcon
                  className='questionAnswerSubjectIcon'
                  style={{fontSize:'3rem'}}/>
                  <p className="questionAnswerSubjectHeading">Physics</p>
                </div>
              </div>
            </div>


          </div>

            <div className="questionAnswerInput">
              <QuestionAnswerInput/>
            </div>

        </div>
      </div>
    </div>
  )
}

export default QuestionAnswer
