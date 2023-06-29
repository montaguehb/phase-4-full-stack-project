import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const SignUp = () => {
  const signUpSchema = Yup.object().shape({
    username: Yup
      .string()
      .required('Please Enter your Username')
      .min(2, "Invalid username")
      .max(50, "Invalid username"),
    password: Yup
      .string()
      .required("Please Enter your Password"),
    email: Yup
      .string()
      .email()
      .required("Please Enter your Email"),
    name: Yup
      .string()
      .required("Please Enter your Name"),
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
