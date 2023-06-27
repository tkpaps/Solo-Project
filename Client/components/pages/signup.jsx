import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';


// import stylesheets

const Signup = () => {

    // write function that listens for a click and makes a fetch request that hits the specified backend route 
    // form will have on submit

    function submitButton (event) {
        // prevent method default form submission
        event.preventDefault();

        // creating form object
        const form = event.target;
        const formData = new FormData(form);

        // grabbing all user input so that you can pass it inside of fetch
        fetch('/signup', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/hompage';
                } else {
                    console.log('signup failed: ', data.error);
                }
            })
            .catch(error => {
                console.log('Error occurred during signup: ', error);
            });
    }

    return (
      <div>
        <h1>Sign Up Page</h1>
        <form method='POST' action='/signup'>
            <input name="username" type="text" placeholder="username"></input>
            <input name="password" type="password" placeholder="password"></input>
            <input name="email" type="text" placeholder="email"></input>
            <input name="firstName" type="text" placeholder="First Name"></input>
            <input name="lastName" type="text" placeholder="Last Name"></input>
            <button onClick={ () => submitButton() } type="submit" value="Create Account"></button>
        </form>
      </div>
    );
  }
  
export default Signup;