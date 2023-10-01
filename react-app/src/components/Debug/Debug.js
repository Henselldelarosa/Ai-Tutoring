import React, { useState, useEffect } from 'react';

const Debug = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

      {loading ? (<p>Loading...</p>) :
        <div>

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
