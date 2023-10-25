import React, { useState, useEffect } from 'react';

const Debug = () => {
  
  // stuff for openai routes
  const [difficulty, setDifficulty] = useState('easy');
  const [subject, setSubject] = useState('physics');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  
  const getQuestion = async (e) => {
    e.preventDefault();

    // Reset all useStates
    setQuestion('');
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
      setQuestion(q.question);

    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

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
  
  // stuff for user routes
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
    <div>
      <h1>Debug Menu</h1>
      <br />

      <div>
        <h2>Backend Routes Demo</h2>
        <br />

        <h3>Generate Question</h3>
        <form onSubmit={getQuestion}>
          <div>
            <label>Difficulty:</label>
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={difficulty === 'easy'}
              onChange={() => setDifficulty('easy')}
            />
            <label>Easy</label>

            <input
              type="radio"
              name="difficulty"
              value="medium"
              checked={difficulty === 'medium'}
              onChange={() => setDifficulty('medium')}
            />
            <label>Medium</label>

            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={difficulty === 'hard'}
              onChange={() => setDifficulty('hard')}
            />
            <label>Hard</label>
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="radio"
              name="subject"
              value="physics"
              checked={subject === 'physics'}
              onChange={() => setSubject('physics')}
            />
            <label>Physics</label>

            <input
              type="radio"
              name="subject"
              value="chemistry"
              checked={subject === 'chemistry'}
              onChange={() => setSubject('chemistry')}
            />
            <label>Chemistry</label>

            <input
              type="radio"
              name="subject"
              value="math"
              checked={subject === 'math'}
              onChange={() => setSubject('math')}
            />
            <label>Math</label>
          </div>
          <button type="submit">Generate a Question!</button>
        </form>
        <br />

        <h3>Your Question</h3>
        { question ? <p>{question}</p> : 'Click the button above to generate a question!'}
        <br />

        {/* <h3>Your Answer</h3> */}
        <form onSubmit={gradeResponse}>
          <label>Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button type="submit">Grade My Answer</button>
        </form>
        <br />

        <h3>AI Feedback</h3>
        { feedback ? <p>{feedback}</p> : ''}
        <br />

        <h3>Ask Your Own Question</h3>
        <form onSubmit={askQuestion}>
          <label>Question:</label>
          <input
            type='text'
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
          <button type="submit">Ask Your Question</button>
        </form>

      </div>

      {loading ? (<p>Loading...</p>) :
        <div>
          <br />
          <h2>User Info</h2>

          <br></br>
          <h2>users table</h2>
          <br></br>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>email</th>
                <th>username</th>
                <th>language</th>
                <th>grade</th>
                <th>learning purposes</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.language}</td>
                  <td>{user.grade}</td>
                  <td>{user.learning_goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <br></br>
          <h2>user edit</h2>
          <br></br>

          <form onSubmit={updateUser}>
            <select id='user-select' onChange={selectUser}>
              <option value={-1}>--Select a User--</option>
              {users.map((user,index)=>{
                return <option value={index} key={user.id}>{user.email}</option>
              })}
            </select>
            <br />
            <label>
              Language: 
              <input type="text" value={language} onChange={handleLanguageChange} />
            </label>
            <br />
            <label>
              Grade: 
              <input type="text" value={grade} onChange={handleGradeChange} />
            </label>
            <br />
            <label>
              Learning Goal: 
              <input type="text" value={learningGoal} onChange={handleLearningGoalChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>

        </div>
      }
    </div>
  );
}

export default Debug;
