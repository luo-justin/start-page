import React, { Component } from 'react';


class Nav extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { userID } = this.props;
    return(
      <div className="">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <ul className="nav justify-content-end ">
          {!userID && (
             <li className="nav-item">
              <a className="nav-link text-light" href="#">Login</a>
            </li>
            )}
          {!userID && (
             <li className="nav-item">
              <a className="nav-link text-light" href="#">Signup</a>
            </li>
            )}
         {userID && (
            <li className="nav-item">
              <a className="nav-link text-light" href="#">Logout</a>
            </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }


}

export default Nav;