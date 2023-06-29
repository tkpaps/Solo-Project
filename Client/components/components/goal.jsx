import React, { useState, useEffect } from 'react';
import '../../stylesheets/style.css';

const GoalComponent = ({ goal, times, countProp}) => {

  const [count, setCount] = useState(countProp);
  const [progress, setProgress] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const newProgress = (count / times) * 100;
      setProgress(newProgress);
    };

    calculateProgress();
  }, [count, times]);
      
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);

    const input = { goalName: goal };
    console.log(input);

    fetch('/api/homepage', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })
      .then(data => {
        console.log('this is the data', data);
        if (data.ok) {
          console.log('Goal count incremented successfully');
        } else {
          throw new Error('Failed to increment goal count');
        }
      })
      .catch(error => {
        console.log('Error occurred during signup: ', error);
      });
  };

  const deleteGoal = () => {

    const input = { goalName: goal };

    fetch('/api/homepage', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })
      .then(data => {
        if (data.ok){
          console.log('Goal successfully deleted');
          setIsDeleted(true);
        } else {
          throw new Error('Could not delete goal');
        }
      })
      .catch(error => {
        console.log('Error occurred during signup: ', error);
      });
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div>
      <div className="goalComponent">
        <h2 className="centered-p">{goal}</h2>
        <p className="centered-p">Goal: {times}</p>
        <p className="centered-p">Progress: {count}</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p></p>
        <div className="container">
          <button className="centered-button" onClick={handleIncrement}>Another Day in the Books!</button>
        </div>
        <div className="delete-goal-container">
          <button className="delete-goal-button" onClick={deleteGoal}>X</button>
        </div>
      </div>
    </div>
  );
};

export default GoalComponent;