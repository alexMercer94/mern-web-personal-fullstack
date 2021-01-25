import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn';
import Contact from '../pages/Contact';
import Error404 from '../pages/Error404';
import Home from '../pages/Home';

const routes = [
    {
        path: '/admin',
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: AdminHome,
                exact: true,
            },
            {
                path: '/admin/login',
                component: AdminSignIn,
                exact: true,
            },
            {
                component: Error404,
            },
        ],
    },
    {
        path: '/',
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true,
            },
            {
                path: '/contact',
                component: Contact,
                exact: true,
            },
            {
                component: Error404,
            },
        ],
    },
];

export default routes;
