import React, { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik-semantic-ui-react";
import { Button, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const SignUp = ({login, updateLogin}) => {
  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Invalid username")
      .max(50, "Invalid username"),
    password: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    name: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const resp = await fetch("/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    updateLogin(resp.ok)
  };

  return (
    <div>
      {login?<Redirect to="/profile" />:<h1>Signup</h1>}
      <Formik
        initialValues={{ name: "", email: "", username: "", password: "" }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Grid id="login" verticalAlign="middle" columns={1} centered>
            <Grid.Column>
              <Form>
                <label>Name:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
                <label>Username:</label>
                <Field type="text" name="username" />
                <ErrorMessage name="username" component="div" />
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <label>Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <Button type="submit" disabled={isSubmitting}>
                  Sign up
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
