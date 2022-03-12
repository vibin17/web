import {Field, Form, Formik} from 'formik'
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './Form.scss'

const LoginForm = () => {
  let { signIn } = useActions()
  let {error} = useTypedSelector(state => state.auth)
  return (
  <div className='form'>
    <div className='form__header'>
      Вход в аккаунт
    </div>
    <Formik
      initialValues={{
        userName: '',
        userPassword: ''
      }}
      onSubmit={async (values) => {
        alert(values.userPassword)
        signIn(values.userName, values.userPassword)
      }}
    >
      <Form className='form__main'>
        <div className='form__main__input'>
          <label className='form__main__input__field-label' htmlFor="userName">Имя пользователя</label>
          <Field className='form__main__input__field' id="userName" name="userName" placeholder="Ваш логин" />
        </div>

        <div className='form__main__input'>
          <label className='form__main__input__field-label' htmlFor="userPassword">Пароль</label>
          <Field className='form__main__input__field' type='password' id="userPassword" name="userPassword" placeholder="Ваш пароль"/>
        </div>

        {error && <div className='form__main__message'>
          <ul className='form__main__message__errors-list'> {
              <li className='form__main__message__errors-list__item'>
                  <span className='form__main__message__errors-list__item__text'>
                    {error}
                  </span>
                </li>
          } </ul>
        </div>
        }

        <button className={`form__main__button ${error && 'form__main__button__message-shown'}`} type="submit">Войти</button>
      </Form>
    </Formik>
  </div>
  )
}

  export default LoginForm