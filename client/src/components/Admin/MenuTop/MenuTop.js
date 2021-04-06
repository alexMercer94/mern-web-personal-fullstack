import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { logout } from '../../../api/auth';
import Logo from '../../../assets/img/svg/logo.svg';
import './MenuTop.scss';

const MenuTop = ({ menuCollapsed, setMenuCollapsed }) => {
    /**
     * Logout user
     */
    const logoutUser = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo" src={Logo} alt="Logo" />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logoutUser}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
};

export default MenuTop;
