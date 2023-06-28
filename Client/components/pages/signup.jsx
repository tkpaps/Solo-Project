import React, { useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

// import stylesheets

const Signup = () => {

  useEffect(() => {
    document.title = 'Signup';
  }, []);

  function submitButton (event) {
    // prevent method default form submission
    event.preventDefault();

    // // creating form object
    const form = event.target;
    // console.log('Form:', form);

    const formData = new FormData(form);
    // console.log('FormData:', formData);

    // Convert FormData object to a plain JavaScript object
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    //   console.log(key, value);
    }
    // console.log(formDataObject);

    // grabbing all user input so that you can pass it inside of fetch
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
    })
      .then(data => {
        console.log('this data was hit', data);
        if (data) {
          window.location.href = '/homepage';
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
      <form method="Post" action="/api/signup">
        <input name="username" type="text" placeholder="username"></input>
        <input name="password" type="password" placeholder="password"></input>
        <input name="email" type="text" placeholder="email"></input>
        <input name="firstName" type="text" placeholder="First Name"></input>
        <input name="lastName" type="text" placeholder="Last Name"></input>
        <input type="submit" value="Create Account"></input>
      </form>
    </div>
  );
};
  
export default Signup;