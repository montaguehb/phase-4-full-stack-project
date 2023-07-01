import React from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik-semantic-ui-react";
import { Button, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SignUp = ({ user, updateUser, method, edit }) => {
  const history = useHistory();

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username cannot be less than 2 characters")
      .max(20, "Username cannot be greater than 20 characters")
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Username must be only letters and numbers with no spaces"
      )
      .required("Please enter a username between 2 and 20 characters"),
    password: Yup.string()
      .min(10, "Password must be at least 10 characters long")
      .matches(/^\S+$/, "Password cannot contain spaces")
      .matches(/[A-Z]/, "Password must have an uppercase letter")
      .matches(/[a-z]/, "Password must have a lowercase letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must have at least one special character"
      )
      .required("Please Enter a Password"),
    email: Yup.string().email().required("Please Enter your Email"),
    name: Yup.string()
      .min(1, "Name must be at least 1 letter")
      .max(30, "Name cannot be longer than 30 letters")
      .matches(/^[a-zA-Z]*$/, "Name must be only letters")
      .required("Please Enter your First Name"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const resp = await fetch(method === "POST" ? "/signup" : "/profile", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (method === "POST" && resp.ok) {
      const data = await resp.json()
      updateUser(data)
      history.push("/concerts")
    }
    resetForm();
  };

  const handle_form_title = () => {
    if (method === "PATCH") {
      return <h1>Edit Profile</h1>;
    } else {
      return <h1>Signup</h1>;
    }
  };

  return (
    <Grid id="login" verticalAlign="middle" columns={1} centered>
      <Grid.Column>
        {handle_form_title()}
        <Formik
          initialValues={
            user
              ? {
                  name: user.first_name,
                  email: user.email,
                  username: user.username,
                  password: "",
                }
              : { name: "", email: "", username: "", password: "" }
          }
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                {method === "POST" ? "Sign up" : "Edit Profile"}
              </Button>

            </Form>
          )}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
