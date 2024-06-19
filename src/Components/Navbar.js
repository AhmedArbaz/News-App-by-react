import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class Navbar extends Component {
  render() {
    return (
    <div className='container position-relative'>
    <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><span className='danger'>&lt;</span>Smart News/&gt;</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/">Home</Link>
          </li>

          <li className="nav-item"><Link className="nav-link" to="/business">Business </Link></li>
          <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
          
          <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </Link>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><Link className="dropdown-item" to="/">Action</Link></li>
              <li><Link className="dropdown-item" to="/">Another action</Link></li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li><Link className="dropdown-item" to="/">Something else here</Link></li>
            </ul>
          </li>
        </ul>
        <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav>
    </div>
   
    )
  }
}

export default Navbar
