import React, { useState, useEffect } from 'react';
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

      const formData = {
        goalName: inputValue,
        count: 0, 
        goalNumber: goalAmount
      };

      fetch('/api/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          console.log('this is the response: ', response);
          return response.json();
        })
        .then(updatedGoal => {
          setGoalList((prevGoals) => [...prevGoals, updatedGoal]);
          setInputValue('');
          setGoalAmount(0);
          setShowGoal(true);
        })
        .catch(error => {
          console.log('Error occured during goal creation:', error);
        });
    }
  };

  useEffect(() => {
    // Fetch goals on page load
    fetch('/api/homepage')
      .then((response) => response.json())
      .then((goals) => {
        const input = [];
        for (let i = 0; i < goals.length; i++){
          const {goalName, count, goalNumber} = goals[i];
          input.push({goalName, count, goalNumber});
        }
        setGoalList(input);
        setShowGoal(true);
      })
      .catch((error) => {
        console.log('Error occurred while fetching goals:', error);
      });
  }, []);

  return (
    <div>
      <h1>Set Your Goals Here!</h1>
      <form>
        <input value={inputValue} onChange={handleInputChange} placeholder="your goal here"></input>
        <p>Enter the number of times you want to accomplish your goal</p>
        <input value={goalAmount} onChange={handleGoalAmountChange} type="number" placeholder="Goal"></input>
        <p></p>
        <button onClick={handleButtonClick}>Add Goal</button>
      </form>
      {showGoal && 
      goalList.map((goal, index) => (
        <GoalComponent key={index} goal={goal.goalName} times={goal.goalNumber} countProp={Number(goal.count)}/>
      ))}
    </div>
  );
}
  
export default HomePage;