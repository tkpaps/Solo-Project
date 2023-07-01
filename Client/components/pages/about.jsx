import React from 'react';
import Header from '../components/header';


function About () {
  return (
    <div>
      <Header />
      <div className="about-container">
        <h2 className="about-heading">Welcome to GoalCrusher</h2>
        <p className="about-text">
        GoalCrusher is a powerful and user-friendly mini full stack application designed to help you track and achieve your goals effectively. Whether you have personal, professional, or educational goals, this application provides you with the tools you need to stay organized, motivated, and on track to success.
        </p>

        <h2 className="about-heading">Features</h2>
        <ul className="about-list">
          <li className="about-list-item">Goal Creation: Easily create and define your goals with a simple and intuitive interface.</li>
          <li className="about-list-item">Progress Tracking: Monitor your progress towards each goal with a visually appealing progress bar.</li>
          <li className="about-list-item">Secure and Private: Your data is encrypted and securely stored, ensuring your privacy and confidentiality.</li>
        </ul>

        <h2 className="about-heading">How It Works</h2>
        <p className="about-text">
          Goal Tracker is built using a full stack technology stack, combining front-end and back-end technologies to deliver a seamless user experience. The application utilizes HTML, CSS, JavaScript, and React for the front-end interface with Redux soon to be implemented, while the back-end is powered by a robust server framework and a database system consisting of express.js and MongoDB to store and retrieve goal-related data.
        </p>
        <p className="about-text" >
          By leveraging the power of this technology stack, GoalCrusher offers real-time updates, synchronization across devices, and reliable data storage, ensuring that you can access and manage your goals anytime, anywhere.
        </p>

        <h2 className="about-heading">Get Started</h2>
        <p className="about-text">
          Ready to start achieving your goals? Visit our homeage to begin using Goal Tracker today. Experience the convenience and effectiveness of tracking your goals with our intuitive and feature-rich application.
        </p>
      </div> 
    </div>
  );
}

export default About;