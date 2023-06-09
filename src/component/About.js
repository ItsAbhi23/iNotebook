import React from 'react'
import {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
// const About = () => {
   
//   return (
//     <div>
//       <h2>This is our about </h2>
//     </div>
//   )
// }

// export default About
// import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1>About iNotebook</h1>
      <div className="card">
        <div className="card-body">
          <h2>Our Mission</h2>
          <p>iNotebook  is a powerful note-taking application designed to help you stay organized and productive. With iNotebook,
             you can easily create, edit, and access your notes from anywhere, at any time. Whether you're a student, professional,
              or just someone who loves to jot down ideas, iNotebook is the perfect tool to manage your important information effectively</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h2>Key Features</h2>
          <ul>
            <li>Intuitive Note Creation</li>
            <li>Easy Editing and Formatting</li>
            <li>Tags and Categories</li>
            <li>Secure and Private</li>
            <li>Access Anywhere</li>
          </ul>
        </div>
      </div>
      {/* <div className="card">
        <div className="card-body">
          <h2>Our Team</h2>
          <p>[Project Name] was created by a passionate team of developers and designers...</p>
        </div>
      </div> */}
      <div className="card">
        <div className="card-body">
          <h2>Contact Us</h2>
          <p>We value your feedback and are here to assist you. If you have any questions, suggestions, or need support,
             please don't hesitate to reach out to us. You can contact us via email at guptabhi40@gmail.com or by filling
              out the contact form on our website</p>
          <button className="btn btn-primary">Contact Us</button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h2>Future Updates</h2>
          <p>We are continuously working to enhance iNotebook and provide you with even more features and improvements. We value your
             input and take your feedback into account when planning future updates. Stay tuned for exciting updates and new 
             functionalities to further elevate your note-taking experience</p>
        </div>
      </div>
    </div>
  );
};

export default About;

