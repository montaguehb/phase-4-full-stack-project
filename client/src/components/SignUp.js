import './SignUp.css'
import React, {useEffect, useState} from "react"; // # remove if unecessary





















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