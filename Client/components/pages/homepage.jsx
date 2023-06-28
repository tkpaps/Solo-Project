import React, { useState } from 'react';
import GoalComponent from '../components/goal';

function HomePage() {

  const [showGoal, setShowGoal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [goalAmount, setGoalAmount] = useState(0);
  const [goalList, setGoalList] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGoalAmountChange = (e) => {
    setGoalAmount(Number(e.target.value));
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setGoalList((prevGoals) => [...prevGoals, {goal: inputValue, times: goalAmount}]);
      setInputValue('');
      setGoalAmount(0);
      setShowGoal(true);
    }
  };


  return (
    <div>
      <h1>Set Your Goals Here!</h1>
      <form>
        <input value={inputValue} onChange={handleInputChange} placeholder="your goal here"></input>
        <p>Enter the number of times you want to accomplish your goal</p>
        <input value={goalAmount} onChange={handleGoalAmountChange} type="number" placeholder="Enter the number of times you want to accomplish this goal"></input>
        <p></p>
        <button onClick={handleButtonClick}>Add Goal</button>
      </form>
      {showGoal && 
      goalList.map((goal, amount, index) => (
        <GoalComponent key={index} goal={goal.goal} times={goal.times}/>
      ))}
    </div>
  );
}
  
export default HomePage;