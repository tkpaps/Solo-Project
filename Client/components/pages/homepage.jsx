import React, { useState } from 'react';
import GoalComponent from '../components/goal';

function HomePage() {

  const [showGoal, setShowGoal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [goalList, setGoalList] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setGoalList((prevGoals) => [...prevGoals, inputValue]);
      setInputValue('');
      setShowGoal(true);
    }
  };


  return (
    <div>
      <h1>Set Your Goals Here!</h1>
      <form>
        <input value={inputValue} onChange={handleInputChange} ></input>
        <input ></input>
        <button onClick={handleButtonClick}>Add Goal</button>
      </form>
      {showGoal && 
      goalList.map((goal, index) => (
        <GoalComponent key={index} goal={goal}/>
      ))}
    </div>
  );
}
  
export default HomePage;