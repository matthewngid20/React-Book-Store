import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import '../App.css'
import image from '../resources/website_logo.png';

import { firebaseConfig } from '../Config/Config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage'; 
import 'firebase/firestore';

export function Header(props) {
  

  




  const SiteNav = props.navigation.map((item, itemKey) => {
    return (
      <NavLink key={itemKey} exact to={item.link} className="nav-link" activeClassName="active">
        {item.name}
      </NavLink>
    )
  })
  
  return (

    <div className="navbar navbar-expand-lg navbar-custom bg-custom-beige">

      <div className="container-fluid">

        <Link className="navbar-brand text-custom" to="/">
          <img src={image} width="auto" height="30"/>
        </Link>
        <button 
          className="navbar-toggler order-3 order-sm-4" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        

        <nav 
          className="navbar navbar-nav flex-row mx-2 order-2 order-sm-2 order-md-3" 
          style={{display:(props.auth) ? "flex" : "none"}}
        >
          
          <Link className="nav-link px-3 py-sm-0" to="/favourites">
            <span className="d-none d-sm-inline-block mx-2">My List</span>
            <i className="fas fa-heart"></i>
          </Link>
          <Link className="nav-link px-3 py-sm-0 " to="/profile">
            <span className="d-none d-sm-inline-block mx-2">Profile</span>
            <i className="fas fa-user-circle"></i>
          </Link>
          <Link className="nav-link px-3 py-sm-0 " to="#">
            <span className="d-none d-dm-inline-block mx-2"></span>
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </nav>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <nav className="navbar-nav">
            {SiteNav}
          </nav>
        </div>
      </div>
    </div> 
  )
}