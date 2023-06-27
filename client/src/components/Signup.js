import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"

const Signup = () => {

    const handleSubmit =  (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);    
    }

    const validate = values => {
        const errors = {};
        return errors
    }

    return (<div>
    <h1>Login</h1>
    <Formik
      initialValues={{ name: "", email: '', username: "", password: '', }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="name" name="name" />
          <ErrorMessage name="name" component="div" />
          <Field type="username" name="username" />
          <ErrorMessage name="username" component="div" />
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>)
};

export default Signup;