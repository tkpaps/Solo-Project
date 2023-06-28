import React, { useState, useEffect } from 'react';

const GoalComponent = ({ goal, times, countProp}) => {

  const [count, setCount] = useState(countProp);
      
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

  return (
    <div>
      <p>{goal}</p>
      <p>Number of Times: {times}</p>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default GoalComponent;