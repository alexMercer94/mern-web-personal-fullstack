import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import { signUpApi } from '../../../api/user';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import './RegisterForm.scss';

const RegisterForm = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        privacyPolicy: false,
    });
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false,
    });
    const { Item } = Form;

    /**
     * Set input values in state
     * @param {*} e
     */
    const onChangeForm = (e) => {
        if (e.target.name === 'privacyPolicy') {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked,
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value,
            });
        }
    };

    /**
     * Validate inputs
     * @param {*} e
     */
    const inputValidation = (e) => {
        const { type, name } = e.target;

        if (type === 'email') {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target),
            });
        }

        if (type === 'password') {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6),
            });
        }

        if (type === 'checkbox') {
            setFormValid({
                ...formValid,
                [name]: e.target.checked,
            });
        }
    };

    /**
     * Register user
     * @param {*} e
     */
    const register = async (e) => {
        e.preventDefault();
        // const { email, password, repeatPassword, privacyPolicy } = formValid;
        const emailValue = inputs.email;
        const passwordValue = inputs.password;
        const repeatPasswordValue = inputs.repeatPassword;
        const privacyPolicyValue = inputs.privacyPolicy;

        if (!emailValue || !passwordValue || !repeatPasswordValue || !privacyPolicyValue) {
            notification['error']({
                message: 'Todos los campos son obligatorios.',
            });
        } else {
            if (passwordValue !== repeatPasswordValue) {
                notification['error']({
                    message: 'Las contraseñas no coinciden.',
                });
            } else {
                const result = await signUpApi(inputs);

                if (!result.ok) {
                    notification['error']({
                        message: result.message,
                    });
                } else {
                    notification['success']({
                        message: result.message,
                    });
                    resetForm();
                }
            }
        }
    };

    /**
     * Reset Form
     */
    const resetForm = () => {
        const inputsForm = document.getElementsByTagName('input');
        for (let index = 0; index < inputsForm.length; index++) {
            inputsForm[index].classList.remove('success');
            inputsForm[index].classList.remove('error');
        }

        setInputs({
            email: '',
            password: '',
            repeatPassword: '',
            privacyPolicy: false,
        });
        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false,
        });
    };

    return (
        <Form className="register-form" onSubmitCapture={register} onChange={onChangeForm}>
            <Item>
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Item>
            <Item>
                <Checkbox name="privacyPolicy" onChange={inputValidation} checked={inputs.privacyPolicy}>
                    He leido y acepto las politicas de privacidad.
                </Checkbox>
            </Item>
            <Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear Cuenta
                </Button>
            </Item>
        </Form>
    );
};

export default RegisterForm;
