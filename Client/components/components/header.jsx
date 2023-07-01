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

  const handleAboutClick = () => {
    fetch('/api/about')
      .then(response => {
        if (response.ok) {
          window.location.href = '/about';
        } else {
          console.log('Fetch request for about page failed');
        }
      })
      .catch(error => {
        console.log('Error occurred getting about page: ', error);
      });
  };

  const handleHomepageClick = () => {
    fetch('/api/getHomepage')
      .then(response => {
        if (response.ok) {
          window.location.href = '/homepage';
        } else {
          console.log('Fetch request for homepage failed');
        }
      })
      .catch(error => {
        console.log('Error occurred getting homepage: ', error);
      });
  };

  return (
    <header>
      <a className="header-title" onClick={handleHomepageClick}>GoalCrusher</a>  
      <button onClick={handleAboutClick}>About</button>
      <button onClick={handleLogoutClick}>Log Out</button>
    </header>
  );
};

export default Header;