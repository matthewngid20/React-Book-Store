import { NavLink, Link } from 'react-router-dom';
import '../App.css'

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

        <Link className="navbar-brand order-0 order-sm-0 order-md-0 text-custom" to="/">{props.name}</Link>
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

        <form className="d-flex flex-fill my-3 my-md-0 flex-fill order-4 order-sm-3 order-md-2">
          <input className="form-control me-md-2" type="search" placeholder="Search for books" aria-label="Search" />
          <button className="btn btn-outline-custom" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <nav 
          className="navbar navbar-nav flex-row mx-2 order-2 order-sm-2 order-md-3" 
          style={{display:(props.auth) ? "flex" : "none"}}
        >
          
          <Link className="nav-link px-3 py-sm-0" to="/favourites">
            <span className="d-none d-sm-inline-block mx-2">My List</span>
            <i className="fas fa-heart"></i>
          </Link>
          <Link className="nav-link px-3 py-sm-0 " to="/profile">
            <span className="d-none d-sm-inline-block mx-2"></span>
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