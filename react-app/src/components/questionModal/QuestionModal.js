import React,{useEffect, useState} from 'react'
import './QuestionModal.scss'

const QuestionModal = ({question,answer, subject}) => {
  let questionCount = 1
  let questionArr= []
  questionArr.push(question)
  return (
    <div className='questionModal'>
      <h2 className='HeaderSecondary'>Course Correct</h2>

      <div className="questionModal__wrapper">
        <div className="questionModal__info">

          {questionArr && questionArr.map((ques,i) => {
            return(
              <div className="questionModal__question" key={i}>
                <span className="questionModal__icon">Q{i + 1}</span>
                <p className="questionModal__paragraph">
                  {ques}
                  <span className="questionModal__subject">{subject}</span>
                </p>

              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default QuestionModal
