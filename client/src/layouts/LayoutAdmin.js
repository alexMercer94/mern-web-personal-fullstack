import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './LayoutAdmin.scss';

const LayoutAdmin = ({ routes }) => {
    const { Header, Content, Footer } = Layout;
    return (
        <Layout>
            <h1>Menu</h1>
            <Header>Header</Header>
            <Content>
                <LoadRoutes routes={routes} />
            </Content>
            <Footer>Footer</Footer>
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
