import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


//Private component : Before signin/login user can't visit any other page like add product, upate , logout

const PrivateComponent = () => {
    const auth = localStorage.getItem("user");
    return auth ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateComponent;
