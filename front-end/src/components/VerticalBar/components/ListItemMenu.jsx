import React from "react";
import { NavLink } from "react-router-dom";

const ListItemMenu = ({ menuItems }) => {
  return (
    <div className="vertical-bar__list-menu">
      {menuItems.map((item, index) => {
        return (
          <NavLink
            key={index}
            to={item.slug}
            activeClassName="vertical-bar__menu-item--active"
            className="vertical-bar__menu-item row cursor-pointer align-items-center"
          >
            <i className={`${item.icon} col-1`}></i>
            <div className="text-capitalize col-9">{item.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default ListItemMenu;
