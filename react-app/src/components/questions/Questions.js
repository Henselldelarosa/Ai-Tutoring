import React from 'react'
import './Questions.css'

const Questions = () => {
  return (
    <div className='questions'>
      <div className="question__wrapper">

        <div className="question__info">
          <span className="question__icon">Q1</span>
          <p className='question__paragraph'>
            A triangle has a perimeter of 24cm. The longest side is 12cm
            and the shortest side is 5cm. Whats the length of the middle side?
            <span className="question__subject">Mathemathic</span>
          </p>
        </div>

        <div className="answer">
          <h4 className="answer__steps">
            To solve this problem, we can use the folloeing steps:
          </h4>

          <ul className="answer__steps--step">
              <li className="step">
                Let x be the length of the middle side.
              </li>

              <li className="step">
                Set up an equation with the givrn information: 5 + x + 12 = 24
              </li>

              <li className="step">
                Solve for x: x = 7 cm
              </li>
          </ul>

           <p className='answer__explain'>
             Therefore, the length of the middle side of the triangle is 7 cm.
             Here is another example of a simple mathematical question in geometry:
             A square has an are of 40 square cm. What is the perimeter of the square?
           </p>

           <h4 className="answer__steps">
            To solve this problem, we can use the folloeing steps:
          </h4>

           <ul className="answer__steps--step">
              <li className="step">
                Let x be the side length of the square.
              </li>

              <li className="step">
                Set up an equation with the givrn information: x^2=40
              </li>

              <li className="step">
                Solve for x: x = 6.32 cm
              </li>

              <li className="step">
                Calculate the perimeter of the square: 4 * 6.32 = 25.28 cm.
              </li>
          </ul>

          <p className='answer__explain'>
             Therefore, the perimeter of the square is 25.28 cm.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
