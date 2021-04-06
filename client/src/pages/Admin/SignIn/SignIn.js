import { Layout, Tabs } from 'antd';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { getAccesToken } from '../../../api/auth';
import Logo from '../../../assets/img/svg/logo.svg';
import LoginForm from '../../../components/Admin/LoginForm';
import RegisterForm from '../../../components/Admin/RegisterForm/RegisterForm';
import './SignIn.scss';

const SignIn = () => {
    const { Content } = Layout;
    const { TabPane } = Tabs;

    if (getAccesToken()) {
        return <Redirect to="/admin" />;
    }

    return (
        <Layout className="signin">
            <Content className="signin__content">
                <h1 className="signin__content-logo">
                    <img src={Logo} alt="Logo" />
                </h1>
                <div className="signin__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Nuevo Usuario</span>} key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
};

export default SignIn;
