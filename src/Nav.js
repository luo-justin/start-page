import React, { Component } from 'react';
import {Link} from '@reach/router';


class Nav extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { userID, logoutUser } = this.props;
    return(
      <div className="">
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">StartHere</Link>
          <ul className="nav justify-content-end ">
          {!userID && (
             <li className="nav-item">
              <Link className="nav-link text-light" to="/login">Login</Link>
            </li>
            )}
          {!userID && (
             <li className="nav-item">
              <Link className="nav-link text-light" to="/signup">Signup</Link>
            </li>
            )}
         {userID && (
            <li className="nav-item">
              <a className="nav-link text-light" href="#" onClick={(e) => logoutUser(e)}>Logout</a>
            </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }


}

export default Nav;