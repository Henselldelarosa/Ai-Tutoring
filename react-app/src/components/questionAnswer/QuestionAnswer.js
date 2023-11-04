import React,{useState, useEffect} from 'react'

// style
import './QuestionAnswer.css'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import QuestionAnswerInput from './QuestionAnswerInput';
import RefreshIcon from '@mui/icons-material/Refresh';

const QuestionAnswer = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [subject, setSubject] = useState(null);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userQuestion, setUserQuestion] = useState('');

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
    try {
      const response = await fetch('/api/openai/generate_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle the response as needed
      const q = await response.json()
      setQuestion([q.question]);
      console.log(q)

    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  // const resetQuestions = (e) => {
  //   e.preventDefault()
  //   saveQuestions = []
  // }

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
                    <button type='submit' className='questions__submit--button'>Generade <RefreshIcon className='question__submit--button-icon'/></button>
                </div>
            </form>

            <div className='hr__section'>
              <span className='hr__span'>OR</span>
            </div>

            <div className="questions__show">
              {question}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionAnswer
