import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Имя пользователся должно быть не меньше чем 3 символа!')
    .max(10, 'Имя пользователся должно быть не больше чем 10 символа!')
    .required('Это поле обьязательно'),
  password: Yup.string()
    .min(5, 'Пароль должно быть не меньше чем 5 символа!')
    .max(32, 'Пароль должно быть не больше чем 32 символа!')
    .required('Это поле обьязательно'),
});
