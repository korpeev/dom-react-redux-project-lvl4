import React, { useEffect, useTransition } from 'react';
import { Form, Formik } from 'formik';
import { signUpScheme } from 'utils/validationSchemas';
import {
  Button, FormControl, FormGroup, FormLabel, FormText,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from 'hooks/useAuth';
import { getAppState } from 'selectors/index';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classes from './style.module.scss';
import { setError } from '../../store/slices/app.js';

function SignUp() {
  const { error: authError } = useSelector(getAppState);
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { onSubmit } = useAuth(dispatch, '/api/v1/signup');
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(setError({ text: '', type: '', isActive: false }));
  }, [pathname]);
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
          console.log(location.pathname);
          if (location.pathname !== '/signup') {
            navigate('/');
          }
        }}
      >
        {({
          errors, touched, handleBlur, values, handleChange, validateOnBlur,
        }) => (

          <Form className={classes.form}>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>{t('form.username')}</FormLabel>
              <FormControl
                className={errors.username ? 'border-danger border-2' : ''}
                onBlur={handleBlur}
                value={values.username}
                onChange={handleChange}
                type="username"
                placeholder={t('form.username')}
                name="username"
              />
              {(validateOnBlur && errors.username && touched.username) && (
              <FormText className="text-danger">
                {t(errors.username)}
              </FormText>
              )}

            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicPassword">
              <FormLabel>{t('form.password')}</FormLabel>
              <FormControl
                className={errors.password ? 'border-danger border-2' : ''}
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder={t('form.password')}
              />
              {(validateOnBlur && errors.password && touched.password) && (
              <FormText className="text-danger">
                {t(errors.password)}
              </FormText>
              )}
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>{t('form.passwordConfirmation')}</FormLabel>
              <FormControl
                className={errors.passwordConfirmation ? 'border-danger border-2' : ''}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
                onChange={handleChange}
                type="password"
                placeholder={t('form.passwordConfirmation')}
                name="passwordConfirmation"
              />
              {(validateOnBlur && errors.passwordConfirmation && touched.passwordConfirmation) && (
              <FormText className="text-danger">
                {t(errors.passwordConfirmation)}
              </FormText>
              )}

            </FormGroup>

            <Button disabled={errors?.username || errors?.password || errors?.passwordConfirmation} variant="primary" type="submit">
              {t('form.signUp')}
            </Button>
            {(authError.isActive && authError.type === 'auth') && (
            <div className="text-danger text-center">
              {t(authError.text)}
            </div>
            )}
            <span className="text-center">
              {t('form.haveAccount')}
              <Link className="m-2" to="/login">{t('form.signIn')}</Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
