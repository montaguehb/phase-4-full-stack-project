import React from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik-semantic-ui-react";
import { Button, Grid } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const Login = ({ login, updateLogin, updateUser }) => {
  const history = useHistory("/");

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username cannot be less than 2 characters")
      .max(20, "Username cannot be greater than 20 characters")
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Username must be only letters and numbers with no spaces"
      )
      .required("Please enter a username between 2 and 20 characters"),
    password: Yup.string()
      .required("Enter Correct Password")

  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const resp = await fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (resp.ok) {
      const data = await resp.json();
      updateUser(data);
      resetForm();
    } else {
      alert("Incorrect Username or Password!");
    }      
};

  return (
    <div>
      {login?<Redirect to="/" />:<h1>Login</h1>}

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >

        {({ isSubmitting }) => (
          <Grid id="login" verticalAlign="middle" columns={1} centered>

            <Grid.Column>
              <Form>

                <label>Username:</label>
                <Field type="text" name="username" />
                <ErrorMessage name="username" component="div" />

                <label>Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />

                <br></br>
                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>

              </Form>
            </Grid.Column>
          </Grid>
        )}
      </Formik>

      <div>
        <p>Dont Have An Account?</p>
        <Link to="/signup">
          <Button>Click Here To Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
