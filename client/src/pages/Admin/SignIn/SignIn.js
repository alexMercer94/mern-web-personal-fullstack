import { Layout, Tabs } from 'antd';
import React from 'react';
import Logo from '../../../assets/img/svg/logo.svg';
import RegisterForm from '../../../components/Admin/RegisterForm/RegisterForm';
import './SignIn.scss';

const SignIn = () => {
    const { Content } = Layout;
    const { TabPane } = Tabs;

    return (
        <Layout className="signin">
            <Content className="signin__content">
                <h1 className="signin__content-logo">
                    <img src={Logo} alt="Logo" />
                </h1>
                <div className="signin__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            Login
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
