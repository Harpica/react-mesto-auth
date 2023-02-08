import { TEXT_MINLENGTH } from '../utils/constants';
import { Validator } from '../utils/validator';
import Footer from "./Footer";
import HeaderAnauth from "./HeaderUnauth";
import LoginForm from './LoginForm';
import useForm from '../hooks/useForm';

// New validator for each input field
const emailValidator = new Validator({
  minLength: TEXT_MINLENGTH,
  required: true,
});
const passwordValidator = new Validator({
  minLength: TEXT_MINLENGTH,
  required: true,
});

const Register = () => {
  const {
    handleChange,
    values,
    errors,
    validities,
    isValid,
    resetForm,
  } = useForm(
    { email: emailValidator, password: passwordValidator },
    true
  );

	return (
		<>
			<HeaderAnauth linkText='Войти' linkPath='/sign-in' />
      <div className='login-container'>
        <LoginForm name='register' title='Регистрация' buttonText='Зарегистрироваться' buttonLoadingText='Регистрация...' isValid={isValid}>
        <input
          type='text'
          className='form__input form__input_theme_black'
          id='input-email'
          name='email'
          placeholder='Email'
          minLength={TEXT_MINLENGTH}
          required
          value={values.email ?? ''}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${
            !validities.email && 'popup__error_visible'
          }`}
          id='email-error'
        >
          {errors.email}
        </span>
        <input
          type='text'
          className='form__input form__input_theme_black'
          id='input-password'
          name='password'
          placeholder='Пароль'
          minLength={TEXT_MINLENGTH}
          required
          value={values.password ?? ''}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${
            !validities.password && 'popup__error_visible'
          }`}
          id='password-error'
        >
          {errors.password}
        </span>
        </LoginForm>
      </div>
			<Footer />
		</>
	);
};

export default Register;
