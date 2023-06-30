import React, { useEffect } from 'react';
import '../../stylesheets/style.css';

function Login() {

  useEffect(() => {
    document.title = 'Login | GoalCrusher';
  }, []);

  function submitButton (event) {

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject)
    })
      .then(data => {
        console.log('this data was hit', data);
        if (data.ok) {
          window.location.href = '/homepage';
        } else {
          console.log('login failed: ', data.error);
        }
      })
      .catch(error => {
        console.log('Error occurred during login: ', error);
      });
  }

  return (
    <div>
      <h1>Welcome to GoalCrusher!</h1>
      <h3>Login or Signup to Continue</h3>
      <form method="POST" action="/api/login">
        <p></p>
        <input name="username" type="text" placeholder="username" required></input>
        <p></p>
        <input name="password" type="password" placeholder="password" required></input>
        <p></p>
        <input type='submit'></input>
      </form>
      <p></p>
      <div className="container">
        <a className="centered-anchor" href='./signup'>Sign up</a>
      </div>
    </div>
  );
}
  
export default Login;