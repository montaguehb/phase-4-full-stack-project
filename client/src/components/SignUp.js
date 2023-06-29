import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const SignUp = () => {
  const signUpSchema = Yup.object().shape({
    username: Yup
      .string()
      .required('Please Enter your Username')
      .min(2, "Invalid username")
      .max(50, "Invalid username")
      .matches(
        // regex in react required to be b/w opening / and closing /
        /^(?=.{4,32}$)(?![.-])(?!.*[.]{2})[a-zA-Z0-9.-]+(?<![.])$/, 
        "Must be between 4 to 32 characters with no combination of _, -, or . in between or at the end."
      ),
    password: Yup
      .string()
      .required("Please Enter your Password")
      .matches(
        /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$])[\w\d@#$]{6,12}$/,
        "Must have at least one uppercase letter, lowercase letter, symbol, and number."
      ),
    email: Yup
      .string()
      .email()
      .required("Please Enter your Email")
      .matches(
        /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/,
        "Must be in proper email format."
      ),
    name: Yup
      .string()
      .required("Please Enter your First Name")
      .matches(
        /[A-Z][a-z]*/
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const resp = await fetch("/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (resp.ok) {
      const data = await resp.json();
      console.log(data);
    } else {
      alert("Unable to signup");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{ name: "", email: "", username: "", password: "" }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Name:</label>
            <Field type="name" name="name" />
            <ErrorMessage name="name" component="div" />
            <label>Username:</label>
            <Field type="username" name="username" />
            <ErrorMessage name="username" component="div" />
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
