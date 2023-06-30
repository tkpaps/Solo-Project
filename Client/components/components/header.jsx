import React from 'react';

const Header = () => {

  const handleLogoutClick = () => {

    fetch('/api/logout', {
      method: 'GET',
      credentials: 'same-origin',})
      .then(response => {
        if (response.ok) {
          window.location.href = '/';
        } else {
          console.log('Logout failed');
        }
      })
      .catch(error => {
        console.log('Error occurred during signup: ', error);
      });
  };

  return (
    <header>
      <h2 className="header-title">GoalCrusher</h2>  
      <button>About</button>
      <button onClick={handleLogoutClick}>Log Out</button>
    </header>
  );
};

export default Header;