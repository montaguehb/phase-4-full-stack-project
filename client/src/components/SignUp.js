import './SignUp.css'
import React, {useEffect, useState} from "react"; // # remove if unecessary

// declare addSignUp in App.js
const SignUp = ({ addSignUp }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });

  // add URL to fetch
  const handleSubmit = e => {
    e.preventDefault();
    const newSignUp = { ...formData };
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSignUp),
    })
    .then(resp => resp.json())
    .then(creation => {
      addSignUp(creation);
      setFormData({
        email: "",
        name: "",
        username: "",
        password: "",
      });
    });
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className='formContainer' onSubmit={handleSubmit}>
      <div>
        <label>E-mail</label>
        <input 
          type='email' 
          id='email' 
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Name</label>
        <input 
          type='text' 
          id='name' 
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Username</label>
        <input 
          type='text' 
          id='username' 
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password</label>
        <input 
          type='text' 
          id='password' 
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
      </div>

    <button className="signupButton" type="submit">Sign Up</button>
  </form>
  );
};

export default SignUp







// scratch work
/*
const SignUp = ({ addSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  })
}
*/

/*
const handleSubmit = e => {
  e.prevenDefault();
  const newSignup = { ...formData };
  fetch("http://localhost:5000/concerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSignup),
  })
    .then((resp) => resp.json())
    .then((createdSignup) => {
      addSignup(createdSignup);
      setFormData({
        name: "",
        age: "",
      })
    })
}
*/