import React, { useEffect } from 'react';

function Login() {

  useEffect(() => {
    document.title = 'Login | YearCrusher';
  }, []);

  function submitButton (event) {

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
      console.log(key, value);
    }

    console.log(formDataObject);

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
      <h1>Login Page</h1>
      <form method="POST" action="/api/login">
        <p>Username</p>
        <input name="username" type="text" placeholder="username" required></input>
        <p>Password</p>
        <input name="password" type="password" placeholder="password" required></input>
        <input type='submit'></input>
      </form>
      <a href='./signup'>Sign up</a>
    </div>
  );
}
  
export default Login;