import React, { useState } from 'react';

const GoalComponent = ({ goal }) => {

  const [count, setCount] = useState(0);
      
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>{goal}</p>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default GoalComponent;