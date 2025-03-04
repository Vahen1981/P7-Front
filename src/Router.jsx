import { createBrowserRouter } from 'react-router-dom';
import { Register } from './components/Register/Register.jsx';
import { SuccessfulRegistration } from './pages/UserPages/SuccessfulRegistration.jsx';
import Layout from './components/Layout/Layout.jsx';
import AllProducts from './pages/ProductsPages/AllProducts.jsx';
import MenClothing from './pages/ProductsPages/MenClothing.jsx';
import WomenClothing from './pages/ProductsPages/WomenClothing.jsx';
import Jewelery from './pages/ProductsPages/Jewelery.jsx';
import Electronics from './pages/ProductsPages/Electronics.jsx';
import LoginPage from './components/Login/Login.jsx';
import ShoppingCart from './pages/UserPages/ShoppingCart.jsx';
import ProductDetail from './pages/ProductsPages/ProductDetail.jsx';
import UserProfile from './pages/UserPages/UserProfile.jsx';
import ChangePassword from './pages/UserPages/ChangePassword.jsx';
import Home from './pages/Home/Home.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx';
import { SuccessfulPayment } from './pages/UserPages/SuccesfullPayment.jsx';
import { FailedPayment } from './pages/UserPages/FailedPayment.jsx';

export const Router = createBrowserRouter([
    { 
        path: '/',
        element: <Layout />,
        children: [
            //Rutas públicas
            { path: '/', element: <Home />},
            { path: '/all-products', element: <AllProducts />},
            { path: '/men', element: <MenClothing />},
            { path: '/women', element: <WomenClothing />},
            { path: '/jewelery', element: <Jewelery />},
            { path: '/electronics', element: <Electronics />},
            { path: '/product-detail/:id', element: <ProductDetail />},
            { path: '/register', element: <Register />},
            { path: '/login', element: <LoginPage />},
            { path: '/successful-registration', element: <SuccessfulRegistration />},
            { path: '/successful-payment', element: <SuccessfulPayment />},
            { path: '/failed-payment', element: <FailedPayment />},

            //Rutas Privadas
            { path: '/userProfile', element: (<PrivateRoute><UserProfile /></PrivateRoute>) },
            { path: '/changePassword', element: (<PrivateRoute><ChangePassword /></PrivateRoute>) },
            { path: '/cart', element: (<PrivateRoute><ShoppingCart /></PrivateRoute>)},
        ]
    },
]);



