import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import './RegisterForm.scss';

const RegisterForm = () => {
    const { Item } = Form;
    return (
        <Form className="register-form">
            <Item>
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    className="register-form__input"
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir Contraseña"
                    className="register-form__input"
                />
            </Item>
            <Item>
                <Checkbox name="privacyPolicy">He leido y acepto las politicas de privacidad.</Checkbox>
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
