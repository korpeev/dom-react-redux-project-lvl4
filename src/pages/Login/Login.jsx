import React from 'react';
import { Formik, Form, Field } from 'formik';
import classes from './style.module.scss';
import { SignupSchema } from '../../utils/validationSchemas.js';

function Login() {
  return (
    <div className={classes.formWrapper}>

      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <span>Login</span>
            <Field className={errors.login ? 'border-danger' : ''} name="login" />
            {errors.login && touched.login ? (
              <div className="text-danger">{errors.login}</div>
            ) : null}
            <span>Password</span>
            <Field className={errors.password ? 'border-danger' : ''} name="password" type="password" />
            {errors.password && touched.password ? <div className="text-danger">{errors.password}</div> : null}
            <input title="Войти" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
