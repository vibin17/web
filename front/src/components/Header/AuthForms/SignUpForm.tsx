import { Field, Form, Formik } from 'formik'
import { FormEvent, useState } from 'react';
import validator from 'validator';
import { useAuthActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import styles from './Form.module.scss'


const SignUpForm = () => {
    let { signUp } = useAuthActions()
    let { signUpError } = useTypedSelector(state => state.auth)
    let [isNameValidated, setNameValidated] = useState(true)
    let [isPasswordValidated, setPasswordValidated] = useState(true)
    let [isPasswordConfirmValidated, setPasswordConfirmValidated] = useState(true)
    let [isPhoneNumberValidated, setPhoneNumberValidated] = useState(true)
    let [password, setPassword] = useState('')
    let [passwordConfirm, setPasswordConfirm] = useState('')

    let validateName = (event: FormEvent) => {
        let name = (event.target as HTMLInputElement).value
        let validated = (name.length >= 3 && name.length <= 20) || !name
        setNameValidated(validated)
    }

    let validatePassword = (event: FormEvent) => {
        let password = (event.target as HTMLInputElement).value
        let validated = (password.length >= 4 && password.length <= 16) || !password
        if (passwordConfirm && (password !== passwordConfirm)) {
            setPasswordConfirmValidated(false)
        } else {
            setPasswordConfirmValidated(true)
        }
        setPassword(password)
        setPasswordValidated(validated)
    }

    let validatePasswordConfirm = (event: FormEvent) => {
        let passwordConfirm = (event.target as HTMLInputElement).value
        let validated = passwordConfirm === password
        setPasswordConfirm(passwordConfirm)
        setPasswordConfirmValidated(validated)
    }

    let validatePhoneNumber = (event: FormEvent) => {
        let phoneNumber = (event.target as HTMLInputElement).value
        let validated = validator.isMobilePhone(phoneNumber, 'ru-RU') || !phoneNumber
        setPhoneNumberValidated(validated)
    }

    return (
        <div className={styles['form']}>
            <div className={styles['form__header']}>
                ??????????????????????
            </div>
            <Formik
                initialValues={{
                    upUserName: '',
                    upUserPassword: '',
                    upUserConfirmPassword: '',
                    upUserPhoneNumber: ''
                }}
                onSubmit={ async (values) => {
                    if (isNameValidated && isPasswordValidated && isPasswordConfirmValidated && isPhoneNumberValidated) {
                            signUp(values.upUserName, values.upUserPhoneNumber, values.upUserPassword)
                        }
                }}
            >
                <Form className={styles['form__main']}>
                    <div className={styles['form-field']}>
                        <label className={styles['form-field__label']} htmlFor="upUserName">?????? ????????????????????????</label>
                        <Field 
                            className={`${styles['form-field__input']} 
                                ${!isNameValidated && styles['form-field__input--incorrect']}`} 
                            type='text' 
                            id="upUserName" 
                            name="upUserName" 
                            placeholder="?????? ??????????" 
                            onBlur={validateName}
                            required
                        />
                        {!isNameValidated &&
                            <div className={`${styles['form-field__error']}`}>
                                ?????????????????????? ?????? ????????????????????????
                            </div>
                        }
                    </div>

                    <div className={styles['form-field']}>
                        <label className={styles['form-field__label']} htmlFor="upUserPassword">????????????</label>
                        <Field 
                            className={`${styles['form-field__input']} 
                                ${!isPasswordValidated && styles['form-field__input--incorrect']}`} 
                            type='password' 
                            id="upUserPassword" 
                            name="upUserPassword" 
                            placeholder="?????? ????????????"
                            onBlur={validatePassword}
                            required
                        />
                        {!isPasswordValidated &&
                            <div className={`${styles['form-field__error']}`}>
                                ?????????????????????? ????????????
                            </div>
                        }
                    </div>
                    
                    <div className={styles['form-field']}>
                        <label className={styles['form-field__label']} htmlFor="upUserConfirmPassword">?????????????????????? ????????????</label>
                        <Field 
                            className={`${styles['form-field__input']} 
                                ${!isPasswordConfirmValidated && styles['form-field__input--incorrect']}`} 
                            type='password' 
                            id="upUserConfirmPassword" 
                            name="upUserConfirmPassword" 
                            placeholder="?????? ????????????" 
                            onBlur={validatePasswordConfirm}
                            required
                        />
                        {!isPasswordConfirmValidated &&
                            <div className={`${styles['form-field__error']}`}>
                                ???????????? ???? ??????????????????
                            </div>
                        }
                    </div>

                    
                    <div className={styles['form-field']}>
                        <label className={styles['form-field__label']} htmlFor="upUserPhoneNumber">?????????? ????????????????</label>
                        <Field 
                            className={`${styles['form-field__input']} 
                                ${!isPhoneNumberValidated && styles['form-field__input--incorrect']}`} 
                            type='tel'
                            maxLength='12'
                            id="upUserPhoneNumber" 
                            name="upUserPhoneNumber" 
                            placeholder="?????? ?????????? ????????????????" 
                            onBlur={validatePhoneNumber}
                            required
                        />
                        {!isPhoneNumberValidated && 
                            <div className={`${styles['form-field__error']}`}>
                                ?????????????????????? ?????????? ????????????????
                            </div>}
                    </div>

                    {signUpError && <div className={styles['form-message']}>
                        {signUpError}
                    </div>}

                    <button className={`${styles['form-button']} ${signUpError && styles['form-button--message-shown']}`} type="submit">????????????????????????????????????</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm