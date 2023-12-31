import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../../stylesheets/style.css';
import ConfettiUse from './confetti';



const GoalComponent = ({ goal, times, countProp, type}) => {

  const [count, setCount] = useState(countProp);
  const [progress, setProgress] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isGoalCompleted, setIsGoalCompleted] = useState(false);

  // change progress bar color as it progresses - see style.css for more information
  const progressColorClass = progress < 33 ? 'red' : progress < 66 ? 'yellow' : 'green';
  const progressBarContainerClass = `progress-bar-container ${progressColorClass}`;

  // calculates progress
  useEffect(() => {
    const calculateProgress = () => {
      const newProgress = (count / times) * 100;
      setProgress(newProgress);
    };

    calculateProgress();
  }, [count, times]);

  // deletes rendering of goal component once complete and renders temporary success message
  useEffect(() => {
    if (count === times) {
      setIsGoalCompleted(true);
      // Reset the component after 3 seconds
      setTimeout(() => {
        setIsGoalCompleted(false);
        deleteGoal();
      }, 4000);
    }
  }, [count, times, countProp]);
      
  // increments goal
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

  // deletes goal
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

  // removes component from rendering immediately 
  if (isDeleted) {
    return null;
  }

  if (count === times) {
    // Render the component differently when count === times
    return (
      <div>
        <ConfettiUse />
        <h2 className="h2-completed">Goal Completed!</h2>
        <p className="p-completed">Congratulations, you have reached your goal.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="goalComponent">
        <h2 className="centered-p">{goal}</h2>
        <p className="centered-p">Goal: {times} {type}</p>
        <p className="centered-p">Progress: {count} {type}</p>
        <div className={progressBarContainerClass}>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{`${Math.floor(progress)}%`} </span>
        </div>
        <p></p>
        <div className="container">
          <button className="centered-button" onClick={handleIncrement}>Another Step Towards Victory!</button>
        </div>
        <div className="delete-goal-container">
          <button className="delete-goal-button" onClick={deleteGoal}>X</button>
        </div>
      </div>
    </div>
  );
};

export default GoalComponent;