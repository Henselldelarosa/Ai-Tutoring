import React from 'react'
import './QuestionAnswerInput.css'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';

const QuestionAnswerInput = () => {
  return (
    <div className='questionAnswerInputBox marging-bottom-small'>

      <div className="questionAnswerInput">

        <div className="questionAnswerInputWrapper">

        <div className='answerQuestionInputItem'>
          <input type="radio" name="" id="" className="answerQuestionRadioInput" />
          <label className='answerQuestionInputLabel' htmlFor="">Easy</label>
        </div>

        <div className='answerQuestionInputItem'>
          <input type="radio" name="" id="" className="answerQuestionRadioInput" />
          <label className='answerQuestionInputLabel' htmlFor="">Medium</label>
        </div>

        <div className='answerQuestionInputItem'>
          <input type="radio" name="" id="" className="answerQuestionRadioInput" />
          <label className='answerQuestionInputLabel' htmlFor="">Hard</label>
        </div>
        </div>

      <div className="questionAnswerInputButtonDiv">
        <button className="questionAnswerInputButton">Generate Question <ReplayOutlinedIcon/></button>
      </div>

      {/* <div className="col-1-of-3">
      &nbsp;
      </div> */}

      </div>
    </div>
  )
}

export default QuestionAnswerInput
