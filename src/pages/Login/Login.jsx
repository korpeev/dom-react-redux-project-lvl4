import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  FormGroup, FormText, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classes from './style.module.scss';
import { SignupSchema } from '../../utils/validationSchemas.js';
import useAuth from '../../hooks/useAuth.js';
import storage from '../../utils/storage.js';
import { getAppState } from '../../selectors/index.js';

function Login() {
  const dispatch = useDispatch();
  const { error: authError } = useSelector(getAppState);
  const { onSubmit } = useAuth(dispatch);
  const navigate = useNavigate();

  useEffect(() => {
    if (storage.get('token')) {
      navigate('/');
    }
  }, []);
  return (
    <div className={classes.formWrapper}>
      <Formik
        validateOnBlur
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={SignupSchema}
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
              <FormControl onBlur={handleBlur} value={values.username} onChange={handleChange} type="username" placeholder="Enter username" name="username" />
              {(validateOnBlur && errors.username && touched.username) && (
                <FormText className="text-danger">
                  {errors.username}
                </FormText>
              )}

            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <FormControl className={errors.password ? 'border-danger border-2' : ''} onBlur={handleBlur} value={values.password} onChange={handleChange} name="password" type="password" placeholder="Password" />
              {(validateOnBlur && errors.password && touched.password) && (
                <FormText className="text-danger">
                  {errors.password}
                </FormText>
              )}
            </FormGroup>
            <Button variant="primary" type="submit">
              Sign in
            </Button>
            {(authError.isActive && authError.type === 'auth') && (
              <div className="text-danger text-center">
                {authError.text}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
