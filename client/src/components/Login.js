import React from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Field } from "formik-semantic-ui-react";
import { Button, Grid } from "semantic-ui-react";
import {Link, useHistory} from 'react-router-dom';
import * as Yup from "yup";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const Login = ({login, updateLogin,updateUser}) => {
  const history = useHistory('/')
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
    updateLogin(resp.ok)
    updateUser(resp)
    console.log(resp)
    history.push('/')
  };

  return (
    <div>
      {login?<Redirect to="/profile" />:<h1>Login</h1>}
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
        <Link to='/signup'>
          <Button>Click Here To Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;