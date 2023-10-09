import React, { useState } from 'react'
import './QuestionAnswerInput.css'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';

const QuestionAnswerInput = () => {

    const [question, setQuestion] = useState('');

    async function handleClick(e){
        e.preventDefault();
        const res = await fetch('/api/openai/generate_question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
        })
        const data = await res.json();
        setQuestion(data.question);
    }
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
        <button className="questionAnswerInputButton" onClick={handleClick}>
          <p>Generate Question</p>
          <ReplayOutlinedIcon className='questionAnswerButtonIcon'/>
        </button>
      </div>

      {/* <div className="col-1-of-3">
      &nbsp;
      </div> */}

      </div>

      <div>
        <h1>Question</h1>
        {question ? question : ''}
      </div>
    </div>
  )
}

export default QuestionAnswerInput
