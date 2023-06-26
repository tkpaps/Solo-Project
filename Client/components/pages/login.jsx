import React from 'react';

function Login() {
    return (
      <div>
        <h1>Login Page</h1>
        <form method="POST" action='/'>
        <p>Username</p>
        <input name="username" type="text" placeholder="username" required></input>
        <p>Password</p>
        <input name="password" type="password" placeholder="password" required></input>
        <input type='submit' value="login"></input>
        </form>
        <a href='./signup'>Sign up</a>
      </div>
    );
  }
  
  export default Login;