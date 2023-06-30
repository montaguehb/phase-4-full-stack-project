import React, { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik-semantic-ui-react";
import { Button, Container, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SignUp = ({ user, updateLogin, method, edit }) => {
  const history = useHistory();

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .required("Please Enter your Username")
      .min(2, "Invalid username")
      .max(50, "Invalid username"),
    // .matches(
    //   // regex in react required to be b/w opening / and closing /
    //   /^(?=.{4,32}$)(?![.-])(?!.*[.]{2})[a-zA-Z0-9.-]+(?<![.])$/,
    //   "Must be between 4 to 32 characters with no combination of _, -, or . in between or at the end."
    // ),
    password: Yup.string().required("Please Enter your Password"),
    // .matches(
    //   /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$])[\w\d@#$]{6,12}$/,
    //   "Must have at least one uppercase letter, lowercase letter, symbol, and number."
    // ),
    email: Yup.string().email().required("Please Enter your Email"),
    // .matches(
    //   /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/,
    //   "Must be in proper email format."
    // ),
    name: Yup.string().required("Please Enter your First Name"),
    // .matches(
    //   /[A-Z][a-z]*/
    // ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const resp = await fetch(method === "POST" ? "/signup" : "/profile", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (method === "POST") {
      updateLogin(resp.ok);
      alert("SignUp Successful!");
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
