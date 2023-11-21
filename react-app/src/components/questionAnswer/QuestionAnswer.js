import React,{useState, useEffect} from 'react'

// style
import './QuestionAnswer.css'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import QuestionAnswerInput from './QuestionAnswerInput';
import RefreshIcon from '@mui/icons-material/Refresh';
import QuestionModalRender from '../questionModal/QuestionModalRender';
import { Modal } from '../../context/Modal';

const QuestionAnswer = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [subject, setSubject] = useState(null);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  let saveQuestions = []
  console.log(subject)
  console.log(difficulty)

  const getQuestion = async (e) => {
    e.preventDefault();
    let saveQuestions = []
    // Reset all useStates
    // setQuestion('');
    setAnswer('');
    setFeedback('');
    // would be good to have 'loading' to show app is working

    // Send the selected options to the Flask backend
    const data = { difficulty, subject };
    setLoading(true)
    try {
      const response = await fetch('/api/openai/generate_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle the response as needed

      if(response.ok){
        const q = await response.json()
        setLoading(false)
        setQuestion([q.question])
      }

    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

  const askQuestion = async (e) => {
    e.preventDefault();

    if(!userQuestion) return;
    const data = { user_question: userQuestion };
    try {
      const response = await fetch('/api/openai/answer_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(response)
      const answer = await response.json();
      setFeedback(answer.generated_answer);
    } catch (error) {
      console.error(error);
    }
  }

  const gradeResponse = async (e) => {
    e.preventDefault();

    if(!question){
      alert('You must generate a question first');
      return;
    }
    if(!answer){
      alert('Type your answer in order to receive feedback');
    }

    // Send the answer to the Flask backend
    const data = { question, answer };
    try {
      const response = await fetch('/api/openai/grade_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle the response as needed
      const f = await response.json();
      setFeedback(f.feedback);

    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };


  console.log(question)
  return (
    <div className='questions'>
      <div className="questions__wrapper">
        <div className="questions__center">
          <div className="questions__top">
            <form onSubmit={getQuestion} className='questions__subject--form row'>
              <label htmlFor="" className='question__label--des'>Subject</label>
              <div className="questions__subject--inputs">

                <label htmlFor='chemistry' className={subject !== 'chemistry'? "questions__subject--inputs-input col-1-of-3" : "questions__subject--inputs-input col-1-of-3 active"}>
                  <input
                  type="radio"
                  name="subject"
                  id="chemistry"
                  className="questions__subject"
                  value='chemistry'
                  checked={subject === 'chemistry'}
                  onChange={() => setSubject('chemistry')}
                  />

                  <label htmlFor="chemistry" className="questions__label--icon">
                  <ScienceOutlinedIcon style={{fontSize: '3rem'}}/>
                  </label>

                  <label htmlFor="chemistry" className="questions__label--text">
                    Chemistry
                  </label>

                </label>


                <label htmlFor='physics' className={subject !== 'physics'? "questions__subject--inputs-input col-1-of-3" : "questions__subject--inputs-input col-1-of-3 active"}>
                  <input
                  type="radio"
                  name="subject"
                  id="physics"
                  className={subject === 'physics'? 'questions__subject' : 'questions__subject active'}
                  value='physics'
                  checked={subject === 'physics'}
                  onChange={() => setSubject('physics')}
                  />

                  <label htmlFor="physics" className="questions__label--icon">
                    <BiotechOutlinedIcon style={{fontSize: '3rem'}}/>
                  </label>

                  <label htmlFor="physics" className="questions__label--text">
                    Physics
                  </label>

                </label>



                <label htmlFor='math' className={subject !== 'math'? "questions__subject--inputs-input col-1-of-3" : "questions__subject--inputs-input col-1-of-3 active"}>
                  <input
                  type="radio"
                  name="subject"
                  id="math"
                  className={subject === 'math'? 'questions__subject' : 'questions__subject active'}
                  value='math'
                  checked={subject === 'math'}
                  onChange={() => setSubject('math')}
                  />

                  <label htmlFor="math" className="questions__label--icon">
                  <CalculateOutlinedIcon style={{fontSize: '3rem'}}/>
                  </label>

                  <label htmlFor="math" className="questions__label--text">
                    Mathematics
                  </label>
                </label>
                </div>

                <hr className='questions__form--hr'/>
                <label htmlFor="" className='question__label--des'>Difficulty</label>
                <div className='question__difficulty--section'>
                  <div className='inner'>

                    <div className="questions__difficulty--group">
                      <input
                      type="radio"
                      name="difficulty"
                      id="easy"
                      value='easy'
                      className='question__difficulty--input'
                      checked={difficulty === 'easy'}
                      onChange={() => setDifficulty('easy')}
                      />

                      <label htmlFor="easy" className='questions__difficulty--label'>
                        <span className="questions__subject--button"></span>
                        Easy
                      </label>

                    </div>


                    <div className="questions__difficulty--group">
                      <input
                      type="radio"
                      name="difficulty"
                      id="medium"
                      value='medium'
                      className='question__difficulty--input'
                      checked={difficulty === 'medium'}
                      onChange={() => setDifficulty('medium')}
                      />

                      <label htmlFor="medium" className='questions__difficulty--label'>
                        <span className="questions__subject--button"></span>
                        Medium
                      </label>

                    </div>

                    <div className="questions__difficulty--group">
                      <input
                      type="radio"
                      name="difficulty"
                      id="hard"
                      value='hard'
                      className='question__difficulty--input'
                      checked={difficulty === 'hard'}
                      onChange={() => setDifficulty('hard')}
                      />

                      <label htmlFor="hard" className='questions__difficulty--label'>
                        <span className="questions__subject--button"></span>
                        Hard
                      </label>

                    </div>
                  </div>
                  {loading && <p>...Loading</p>}
                    <button onClick={()=> setShowModal(true)}type='submit' className='questions__submit--button btt'>Generade Question<RefreshIcon className='question__submit--button-icon'/></button>

                </div>
            </form>

            {showModal && (
                    <QuestionModalRender
                    showModal={showModal}
                    setShowModal={setShowModal}
                    question={question}
                    answer={answer}
                    subject={subject}
                    type='submit'/>
            )}

            <div className='hr__section'>
              <span className='hr__span'>OR</span>

              <form className='questions__user--question-form'onSubmit={askQuestion}>
                <input
                type="text"
                className="questions__own--input"
                placeholder='Ask Your Own Question'
                value={userQuestion}

                onChange={(e) => setUserQuestion(e.target.value)}
                />

                <button className='questions__ask btt'type='submit'>Ask Your Question</button>
              </form>
            </div>

            {/* <div className="questions__show">
              {question.length !==0 && (
                <div className='questions__own--answer'>
                  <form className='questions__own--form' onSubmit={gradeResponse}>
                  <p className='questions__own--ai-question'>{question}</p>
                  <br />
                  <div className="question__input--container">

                    <input
                    type="text"
                    className="questions__answer--own-input"
                    placeholder='Enter Answer Here'
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    />

                    <button className='questions__user--button-answer btt' type='submit'>Grade</button>
                  </div>
                  </form>

                <div className="questions__ai--feedback-container">
                <h3 className='questions__ai--feedback'>AI Feedback</h3>
                { feedback ? <p className='questions--ai-display'>{feedback}</p> : ''}
                </div>
                </div>


              )
               } */}

              {/* <form action="">

              </form> */}
              {/* {question}
              {feedback ? <p>{feedback}</p> : ''} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionAnswer
