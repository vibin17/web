import {Field, Form, Formik} from 'formik'
import { useAuthActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import styles from './Form.module.scss'

const SignInForm = () => {
  let { signIn } = useAuthActions()
  let { signInError } = useTypedSelector(state => state.auth)
  return (
  <div className={styles['form']}>
    <div className={styles['form__header']}>
      Вход в аккаунт
    </div>
    <Formik
      initialValues={{
        userName: '',
        userPassword: ''
      }}

      onSubmit={async (values) => {
        signIn(values.userName, values.userPassword)
      }}
    >
      <Form className={styles['form__main']}>
        <div className={styles['form-field']}>
          <label className={styles['form-field__label']} htmlFor="userName">Имя пользователя</label>
          <Field 
            className={styles['form-field__input']} 
            id="userName" name="userName" 
            placeholder="Ваш логин"
            required
          />
        </div>

        <div className={styles['form-field']}>
          <label className={styles['form-field__label']} htmlFor="userPassword">Пароль</label>
          <Field 
            className={styles['form-field__input']} 
            type='password' id="userPassword" 
            name="userPassword" 
            placeholder="Ваш пароль"
            required
          />
        </div>

        {signInError && <div className={styles['form-message']}>
          {signInError}
        </div>
        }

        <button className={`${styles['form-button']} ${signInError && styles['form-button--message-shown']}`} type="submit">Войти</button>
      </Form>
    </Formik>

    <div className={styles['form-additional']}>
        Забыли пароль?
    </div>

  </div>
  )
}

  export default SignInForm