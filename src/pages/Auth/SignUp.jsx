import React from 'react';
import { Form, Formik } from 'formik';
import { signUpScheme } from 'utils/validationSchemas';
import {
  Button, FormControl, FormGroup, FormLabel, FormText,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from 'hooks/useAuth';
import { getAppState } from 'selectors/index';
import { Link, useNavigate } from 'react-router-dom';
import classes from './style.module.scss';

function SignUp() {
  const { error: authError } = useSelector(getAppState);
  const dispatch = useDispatch();
  const { onSubmit } = useAuth(dispatch, '/api/v1/signup');
  const navigate = useNavigate();
  return (
    <div className={classes.formWrapper}>
      <Formik
        validateOnBlur
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={signUpScheme}
        onSubmit={async (values) => {
          await onSubmit(values);
          navigate('/');
        }}
      >
        {({
          errors, touched, handleBlur, values, handleChange, validateOnBlur,
        }) => (

          <Form className={classes.form}>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Username</FormLabel>
              <FormControl
                className={errors.username ? 'border-danger border-2' : ''}
                onBlur={handleBlur}
                value={values.username}
                onChange={handleChange}
                type="username"
                placeholder="Enter username"
                name="username"
              />
              {(validateOnBlur && errors.username && touched.username) && (
              <FormText className="text-danger">
                {errors.username}
              </FormText>
              )}

            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <FormControl
                className={errors.password ? 'border-danger border-2' : ''}
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
              />
              {(validateOnBlur && errors.password && touched.password) && (
              <FormText className="text-danger">
                {errors.password}
              </FormText>
              )}
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl
                className={errors.passwordConfirmation ? 'border-danger border-2' : ''}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
                onChange={handleChange}
                type="password"
                placeholder="Enter Second Password"
                name="passwordConfirmation"
              />
              {(validateOnBlur && errors.passwordConfirmation && touched.passwordConfirmation) && (
              <FormText className="text-danger">
                {errors.passwordConfirmation}
              </FormText>
              )}

            </FormGroup>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            {(authError.isActive && authError.type === 'auth') && (
            <div className="text-danger text-center">
              {authError.text}
            </div>
            )}
            <span className="text-center">
              Есть Аккаунт?
              <Link className="m-2" to="/login">Вход</Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
