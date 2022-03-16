import {Field, Form, Formik} from 'formik'
import { FormEvent, useState } from 'react';
import validator from 'validator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { signUp } from '../../store/action-creators/authAction';
import styles from './Form.module.scss'

const SignUpForm = () => {
    let { signIn } = useActions()
    let { error } = useTypedSelector(state => state.auth)
    let [isNameValidated, setNameValidated] = useState(true)
    let [isPasswordValidated, setPasswordValidated] = useState(true)
    let [isPhoneNumberValidated, setPhoneNumberValidated] = useState(true)

    let validateName = (event: FormEvent) => {
        let name = (event.target as HTMLInputElement).value
        let validated = name.length >= 3 && name.length <= 20 || !name
        console.log(name)
        console.log(!name)
        if (validated)
            return setNameValidated(true)
        setNameValidated(false)
    }

    let validatePassword = (event: FormEvent) => {
        let password = (event.target as HTMLInputElement).value
        let validated = password.length >= 4 && password.length <= 16 || !password
        if (validated)
            return setPasswordValidated(true)
        setPasswordValidated(false)
    }

    let validatePhoneNumber = (event: FormEvent) => {
        let phoneNumber = (event.target as HTMLInputElement).value
        let validated = validator.isMobilePhone(phoneNumber, 'ru-RU') || !phoneNumber
        if (validated)
            return setPhoneNumberValidated(true)
        setPhoneNumberValidated(false)
    }


    return (
        <div className={styles['form']}>
            <div className={styles['form__header']}>
                Регистрация
            </div>
            <Formik
                initialValues={{
                userName: '',
                userPassword: '',
                userConfirmPassword: '',
                userPhoneNumber: ''
                }}
                onSubmit={async (values) => {
                console.log(values.userName, values.userPhoneNumber, values.userPassword)
                signUp(values.userName, values.userPhoneNumber, values.userPassword)

                }}
            >
                <Form className={styles['form__main']}>
                <div className={styles['form-field']}>
                    <label className={styles['form-field__label']} htmlFor="userName">Имя пользователя</label>
                    <Field className={styles['form-field__input']} id="userName" 
                    name="userName" placeholder="Ваш логин" onBlur={validateName}/>
                </div>

                <div className={styles['form-field']}>
                    <label className={styles['form-field__label']} htmlFor="userPassword">Пароль</label>
                    <Field className={styles['form-field__input']} type='password' 
                    id="userPassword" name="userPassword" placeholder="Ваш пароль" onBlur={validatePassword}/>
                </div>

                
                <div className={styles['form-field']}>
                    <label className={styles['form-field__label']} htmlFor="userConfirmPassword">Подтвердите пароль</label>
                    <Field className={styles['form-field__input']} type='password' 
                    id="userConfirmPassword" name="userConfirmPassword" placeholder="Ваш пароль" onBlur={validatePassword}/>
                </div>

                
                <div className={styles['form-field']}>
                    <label className={styles['form-field__label']} htmlFor="userPhoneNumber">Номер телефона</label>
                    <Field className={styles['form-field__input']} type='tel' 
                    id="userPhoneNumber" name="userPhoneNumber" placeholder="Ваш номер телефона" onBlur={validatePhoneNumber}/>
                </div>

                {(!isNameValidated || !isPasswordValidated || !isPhoneNumberValidated) && <div className={styles['form-message']}>
                    <ul className={styles['errors-list']}>
                        {!isNameValidated && <li className={styles['errors-list-item']}>
                            <span className={styles['errors-list-item__text']}>
                                Некоректное имя пользователя
                            </span> 
                        </li>}
                        {!isPasswordValidated && <li className={styles['errors-list-item']}>
                            <span className={styles['errors-list-item__text']}>
                                Некоректный пароль 
                            </span>
                        </li>}
                        {!isPhoneNumberValidated && <li className={styles['errors-list-item']}>
                            <span className={styles['errors-list-item__text']}>
                                Некоректный номер телефона
                            </span>
                        </li>}
                    </ul>
                </div>}

                <button className={`${styles['form-button']} ${error && styles['form-button--message-shown']}`} type="submit">Зарегистрироваться</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm