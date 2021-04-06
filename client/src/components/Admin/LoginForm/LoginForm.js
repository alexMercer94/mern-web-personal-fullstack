import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import './LoginForm.scss';

const LoginForm = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
    });
    const { Item } = Form;

    /**
     * Set input values in state
     * @param {*} e
     */
    const onChangeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
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
    };

    /**
     * Login user
     * @param {*} e
     */
    const login = async (e) => {
        e.preventDefault();

        const emailValue = inputs.email;
        const passwordValue = inputs.password;

        if (!emailValue || !passwordValue) {
            notification['error']({
                message: 'Todos los campos son obligatorios.',
            });
        } else {
            const result = await signInApi(inputs);
            if (result.message) {
                notification['error']({
                    message: result.message,
                });
            } else {
                const { accessToken, refreshToken } = result;

                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
                notification['success']({
                    message: 'Login Correcto.',
                });

                window.location.href = '/admin';
            }
        }
    };

    return (
        <Form className="register-form" onSubmitCapture={login} onChange={onChangeForm}>
            <Item>
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    className="login-form__input"
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
                    className="login-form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Item>
            <Item>
                <Button htmlType="submit" className="register-form__button">
                    Entrar
                </Button>
            </Item>
        </Form>
    );
};

export default LoginForm;
