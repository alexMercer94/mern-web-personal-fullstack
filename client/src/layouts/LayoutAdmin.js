import { Layout } from 'antd';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MenuSider from '../components/Admin/MenuSider';
import MenuTop from '../components/Admin/MenuTop';
import SignIn from '../pages/Admin/SignIn';
import './LayoutAdmin.scss';

const LayoutAdmin = ({ routes }) => {
    const { Header, Content, Footer } = Layout;
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    const user = null;

    if (!user) {
        return (
            <>
                <Route path="/admin/login" component={SignIn} />
                <Redirect to="/admin/login" />
            </>
        );
    }

    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed} />
            <Layout className="layout-admin" style={{ marginLeft: menuCollapsed ? '80px' : '200px' }}>
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer className="layout-admin__footer">Footer</Footer>
            </Layout>
        </Layout>
    );
};

/**
 * Load children routes
 * @param {*} param
 */
const LoadRoutes = ({ routes }) => {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact} component={route.component} />
            ))}
        </Switch>
    );
};

export default LayoutAdmin;
