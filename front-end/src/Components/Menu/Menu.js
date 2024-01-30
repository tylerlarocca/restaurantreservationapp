import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { Link } from 'react-router-dom';

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

const Menu = () => {
  // if screen size decreases, need to toggle back to true
  return (
    <nav className="navbar navbar-dark align-items-start p-0 m-2">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text text-center mx-0">
            <h4 className="m-0 p-0 text-wrap">
              Periodic Tables Reservation System
            </h4>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />

        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <MenuItem address="/dashboard" design="dashboard" name="Dashboard" />
          <MenuItem address="/search" design="magnifying-glass" name="Search" />
          <MenuItem
            address="/reservations/new"
            design="plus"
            name="New Reservation"
          />
          <MenuItem address="/tables/new" design="layers" name="New Table" />
        </ul>
      </div>
    </nav>
  );
};

export default Menu;