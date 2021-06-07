import React from 'react';
import { Link, NavLink } from 'react-router-dom'
const Header = () => (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to='/productos' className="navbar-brand"> React CRUD & Routing</Link>
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                {/*NavLink permite resaltar la ruta actual*/}
                <NavLink to='/productos' className="nav-link" activeClassName="active"> Productos</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/nuevo-producto' className="nav-link" activeClassName="active"> Nuevo producto</NavLink>
            </li>
        </ul>
    </nav>
);

export default Header;