import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(32, 'Too Long!')
    .required('Required'),
});
