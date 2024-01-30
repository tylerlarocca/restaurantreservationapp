import React from 'react';
import Menu from '../../Components/Menu/Menu';
import Routes from '../../Routes/Routes';
import './Layout.css';

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
const Layout = () => {
  return (
    <div className="container-fluid layout">
      <div className="row">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
};

export default Layout;