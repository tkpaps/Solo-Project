import React from 'react';

function Signup() {
    return (
      <div>
        <h1>Sign Up Page</h1>
        <form method='POST' action='/signup'>
            <input name="username" type="text" placeholder="username"></input>
            <input name="password" type="password" placeholder="password"></input>
            <input name="email" type="text" placeholder="email"></input>
            <input name="firstName" type="text" placeholder="First Name"></input>
            <input name="lastName" type="text" placeholder="Last Name"></input>
            <input type="submit" value="Create Account"></input>
        </form>
      </div>
    );
  }
  
  export default Signup;