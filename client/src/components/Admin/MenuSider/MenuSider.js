import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './MenuSider.scss';

const MenuSider = ({ menuCollapsed }) => {
    const { Sider } = Layout;
    const { Item } = Menu;
    return (
        <Sider className="menu-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Item key="1">
                    <Link to={'/admin'}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Item>
                <Item key="2">
                    <Link to={'/admin/users'}>
                        <UserOutlined />
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Item>
            </Menu>
        </Sider>
    );
};

export default MenuSider;
