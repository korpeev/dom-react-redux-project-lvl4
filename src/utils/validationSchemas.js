import * as Yup from 'yup';

export const signUpScheme = Yup.object().shape({
  username: Yup.string()
    .min(3, 'validations.min')
    .max(20, 'validations.max')
    .required('validations.required'),
  password: Yup.string()
    .min(6, 'validations.min')
    .required('validations.required'),
  passwordConfirmation: Yup.string()
    .required('validations.required')
    .oneOf([Yup.ref('password'), null], 'validations.passMustBeMatch'),
});

export const signInScheme = Yup.object().shape({
  username: Yup.string()
    .min(3, 'validations.min')
    .max(20, 'validations.max')
    .required('validations.required'),
  password: Yup.string()
    .min(6, 'validations.min')
    .required('validations.required'),
});

export const channel = (array) => Yup.object().shape({
  text: Yup.string().required('validations.required').min(6, 'validations.min')
    .max(20, 'validations.max')
    .notOneOf(array, 'validations.unique'),
});
