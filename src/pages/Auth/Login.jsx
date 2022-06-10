import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormGroup,
  FormText,
  FormControl,
  FormLabel,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth.js';
import { getAppState } from '../../selectors/index.js';
import storage from '../../utils/storage.js';
import classes from './style.module.scss';
import { signInScheme } from '../../utils/validationSchemas.js';
import { setError } from '../../store/slices/app.js';

function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error: authError } = useSelector(getAppState);
  const { onSubmit } = useAuth(dispatch);
  const navigate = useNavigate();

  useEffect(() => {
    if (storage.get('token')) {
      navigate('/');
    }
    dispatch(setError({ text: '', isActive: false }));
  }, [dispatch]);
  return (
    <div className={classes.formWrapper}>
      <Formik
        validateOnBlur
        validationSchema={signInScheme}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        {({
          errors,
          touched,
          handleBlur,
          values,
          handleChange,
          validateOnBlur,
        }) => (
          <Form className={classes.form}>
            <FormGroup className="mb-3" controlId="username">
              <FormLabel>{t('form.nickname')}</FormLabel>
              <FormControl
                className={errors.username ? 'border-danger border-2' : ''}
                onBlur={handleBlur}
                value={values.username}
                onChange={handleChange}
                type="username"
                placeholder={t('form.nickname')}
                name="username"
              />
              {validateOnBlur && errors.username && touched.username && (
                <FormText className="text-danger">
                  {t(errors.username)}
                </FormText>
              )}
            </FormGroup>
            <FormGroup className="mb-3" controlId="password">
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
              {validateOnBlur && errors.password && touched.password && (
                <FormText className="text-danger">
                  {t(errors.password)}
                </FormText>
              )}
            </FormGroup>
            {authError.isActive && (
              <div className="text-danger text-center">{t(authError.text)}</div>
            )}
            <Button
              role="button"
              disabled={errors?.username || errors?.password}
              variant="primary"
              type="submit"
            >
              {t('form.signIn')}
            </Button>
            <span className="text-center">
              {t('form.notHaveAccount')}
              <Link className="m-2" to="/signup">
                {t('form.register')}
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
