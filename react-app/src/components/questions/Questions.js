import React, {useState, useEffect} from 'react'
import './Questions.css'
import { useDispatch } from 'react-redux'

const Questions = () => {
  const dispatch = useDispatch()

  //slice of State
  const [difficulty, setDifficulty] = useState('easy');
  const [subject, setSubject] = useState('physics');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userQuestion, setUserQuestion] = useState('');

  const getQuestions = async (e) => {
    e.preventDefault()

    setQuestion('')
    setAnswer('');
    setFeedback('');


    const data = { difficulty, subject };
      try{
    const response = await fetch('/api/openai/generate_question', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const q = await response.json()
    setQuestion(q.question);
  }
  catch (error) {
    // Handle any errors
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

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({id: -1});
  const [language, setLanguage] = useState('');
  const [grade, setGrade] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const handleLanguageChange = (event) => {setLanguage(event.target.value)};
  const handleGradeChange = (event) => {setGrade(event.target.value)};
  const handleLearningGoalChange = (event) => {setLearningGoal(event.target.value)};

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  function selectUser(e){
    const user = users[e.target.value]
    setSelectedUser(user || {})
    setLanguage(user?.language || '');
    setGrade(user?.grade || '');
    setLearningGoal(user?.learning_goal || '');
  }

  async function updateUser(e){
    e.preventDefault();
    if(selectedUser.id===-1) return
    await fetch(`/api/users/${selectedUser.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        language: language,
        grade: grade,
        learning_goal: learningGoal,
      })
    });
    fetchUsers();
  }

  return (
    <div className='questions'>

      {/* <div className="question__wrapper">
        <form onSubmit={getQuestions}>
          <label htmlFor="">Difficulty:</label>
        </form>
      </div> */}
      {/* <div className="question__wrapper">

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
      </div> */}
    </div>
  )
}

export default Questions
