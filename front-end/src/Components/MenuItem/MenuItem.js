import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ address, design, name }) => {
  return (
    <li className="nav-item my-0 p-1" key={name}>
      <Link className="nav-link" to={address}>
        <span className={`oi oi-${design}`} />
        &nbsp;{name}
      </Link>
    </li>
  );
};

export default MenuItem;