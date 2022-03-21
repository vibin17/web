import { Formik } from 'formik'
import { useState } from 'react'
import styles from './CreateProductForm.module.scss'

const CreateProductForm = () => {
    let [category, setCategory] = useState('')

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
                console.log(values.userName, values.userPassword)
                signIn(values.userName, values.userPassword)
            }}
            >
            <Form className={styles['form__main']}>
                <div className={styles['form-field']}>
                <label className={styles['form-field__label']} htmlFor="userName">Имя пользователя</label>
                <Field className={styles['form-field__input']} id="userName" name="userName" placeholder="Ваш логин" />
                </div>
        
                <div className={styles['form-field']}>
                <label className={styles['form-field__label']} htmlFor="userPassword">Пароль</label>
                <Field className={styles['form-field__input']} type='password' id="userPassword" name="userPassword" placeholder="Ваш пароль"/>
                </div>
        
                {error && <div className={styles['form-message']}>
                {error}
                </div>
                }
        
                <button className={`${styles['form-button']} ${error && styles['form-button--message-shown']}`} type="submit">Войти</button>
            </Form>
            </Formik>
      </div>
    )
}

export default CreateProductForm