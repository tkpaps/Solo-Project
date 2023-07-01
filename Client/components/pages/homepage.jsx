import React, { useState, useEffect } from 'react';
import GoalComponent from '../components/goal';
import Header from '../components/header';
import '../../stylesheets/style.css';


function HomePage() {

  const [showGoal, setShowGoal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [goalAmount, setGoalAmount] = useState(1);
  const [goalList, setGoalList] = useState([]);
  const [firstName, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    // Check if the user is authenticated
    fetch('/api/check-authentication', { method: 'GET', credentials: 'same-origin' })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (!data.isAuthenticated) {
          window.location.href = '/'; 
        }
      })
      .catch(error => {
        console.log('This is for auth:', error);
      });
  }, [history]);

  // input change handlers
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGoalAmountChange = (e) => {
    setGoalAmount(Number(e.target.value));
  };

  const handleTypeAmountChange = (e) => {
    setType(e.target.value);
  };

  // create a new goal
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {

      const formData = {
        goalName: inputValue,
        count: 0, 
        goalNumber: goalAmount,
        goalType: type
      };

      fetch('/api/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          // console.log('this is the response: ', response);
          return response.json();
        })
        .then(updatedGoal => {
          setGoalList((prevGoals) => [...prevGoals, updatedGoal]);
          setInputValue('');
          setGoalAmount(1);
          setShowGoal(true);
          setType('');
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
          const {goalName, count, goalNumber, goalType} = goals[i];
          input.push({goalName, count, goalNumber, goalType});
        }
        setGoalList(input);
        setShowGoal(true);
      })
      .catch((error) => {
        console.log('Error occurred while fetching goals:', error);
      });
  }, []);

  useEffect(() => {
    fetch('/api/getName')
      .then((response) => response.json())
      .then(data => {
        // console.log(data);
        const { firstName } = data;
        const name = { firstName };
        setName(name.firstName);
      })
      .catch((error) => {
        console.log('Error occurred while fetching goals:', error);
      });
  }, [] );

  return (
    <div>
      <Header />
      <h1>Set Your Goals Here, {firstName.trim()}!</h1>
      <form>
        <>Name of Goal: </>
        <input value={inputValue} onChange={handleInputChange} placeholder="your goal here"></input>
        <br></br>
        <>Your Goal: </>
        <input value={goalAmount} onChange={handleGoalAmountChange} type="number" min="1" placeholder='how many times?'></input>
        <br></br>
        <>Measurement: </>
        <input value={type} onChange={handleTypeAmountChange} placeholder="type of goal"></input>
        <p></p>
        <button className="homepage-button" onClick={handleButtonClick}>Add Goal</button>
      </form>
      {showGoal && 
      goalList.map((goal, index) => (
        <GoalComponent key={index} goal={goal.goalName} times={goal.goalNumber} countProp={Number(goal.count)} type={goal.goalType}/>
      ))}
    </div>
  );
}
  
export default HomePage;