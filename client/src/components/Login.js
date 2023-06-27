import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Invalid username")
      .max(50, "Invalid username")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const resp = await fetch("/login", {
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
      alert("Unable to login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ name: "", email: "", username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Username:</label>
            <Field type="username" name="username" />
            <ErrorMessage name="username" component="div" />
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

export default Login;
