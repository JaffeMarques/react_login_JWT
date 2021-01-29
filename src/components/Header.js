import React, { useState } from 'react';
import { 
    Link, 
    useHistory } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';
import './Header.css';

export default function Header() {
  const [token] = useState(localStorage.getItem('token'));
  const history = useHistory();

  // if(token === '' || token === null){
  //   history.push('/login');
  // }

  function handleLogout() {
    localStorage.clear();
    history.push('/login');
  }

  return (
      <div className="navbar navbar-dark bg-dark justify-content-between">
        <Link to="/" className="menu-title navbar-brand">
          <h1>qiōra</h1>
        </Link>
        <div className="float-right">
          { token ? (
            <div className="">
              <Link to="/user" className="menu-title navbar-brand"> 
                <FiUser className="btn-logout" size={25} color="#ffffff" />
              </Link> | 
              <Link onClick={handleLogout} className="menu-title navbar-brand"> 
                <FiLogOut className="btn-logout" size={25} color="#ffffff" />
              </Link>
            </div>
            
          ) : (
            <div>
              <Link to="/login" className="menu-item text-white">
                login
              </Link> 
              <span className="text-white"> | </span>
              <Link to="/register" className="menu-item text-white">
                Registrar
              </Link>
            </div>
          ) }
        </div>
      </div>
  );
}