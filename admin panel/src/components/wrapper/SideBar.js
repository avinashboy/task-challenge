import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
} from "react-router-dom";
import Create from "../crud/Create";
import View from "../crud/View";
import Animations from "./Animations";
import Borders from "./Borders";
import Buttons from "./Buttons";
import Cards from "./Cards";
import Colors from "./Colors";
import ContentWrap from "./ContentWrap";

const info = [
  {
    sideDivider: true,
    sideHeading: "InterFace",
    icon: "fas fa-fw fa-cog",
    name: "Components",
    children: { header: "Custom Components:", items: ["Buttons", "Cards"] },
  },
  {
    sideDivider: false,
    sideHeading: null,
    icon: "fas fa-fw fa-wrench",
    name: "Utilities",
    children: {
      header: "Custom Utilities:",
      items: ["Colors", "Borders", "Animations"],
    },
  },
  {
    sideDivider: true,
    sideHeading: "Operation",
    icon: "fas fa-fw fa-folder",
    name: "Pages",
    children: { header: "Action", items: ["Create", "View"] },
  },
];

function getElement({ name, icon, children, header, divider, key }) {
  return (
    <>
      {divider ? <hr className='sidebar-divider' /> : ""}
      <div className='sidebar-heading' key={key}>
        {header}
      </div>
      <li className='nav-item'>
        <a
          className='nav-link collapsed'
          data-toggle='collapse'
          data-target={"#" + name}
          aria-expanded='true'
          aria-controls={name}
        >
          <i className={icon}></i>
          <span>{name}</span>
        </a>
        <div
          id={name}
          className='collapse'
          aria-labelledby='headingTwo'
          data-parent='#accordionSidebar'
        >
          <div className='bg-white py-2 collapse-inner rounded'>
            <h6 className='collapse-header'>{children.header}</h6>
            {children.items.map((e, ind) => {
              return (
                <Link to={"/" + e} key={ind} className='collapse-item'>
                  {e}
                </Link>
              );
            })}
          </div>
        </div>
      </li>
    </>
  );
}

function SideBar() {
  return (
    <Router>
      <ul
        className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
        id='accordionSidebar'
      >
        <Link
          to='/'
          className='sidebar-brand d-flex align-items-center justify-content-center'
        >
          <div className='sidebar-brand-icon rotate-n-15'>
            <i className='far fa-grin-tongue'></i>
          </div>
          <div className='sidebar-brand-text mx-3'>My Admin</div>
        </Link>

        <hr className='sidebar-divider' />

        <li className='nav-item active'>
          <Link to='/' className='nav-link'>
            <i className='fas fa-fw fa-tachometer-alt'></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {info.map((e, key) => {
          return getElement({
            name: e.name,
            icon: e.icon,
            children: e.children,
            header: e.sideHeading ? e.sideHeading : "",
            divider: e.sideDivider,
            key,
          });
        })}

        <hr className='sidebar-divider d-none d-md-block' />

        <div className='text-center d-none d-md-inline'>
          <button
            className='rounded-circle border-0'
            id='sidebarToggle'
          ></button>
        </div>
      </ul>
      <Switch>
        <Route element={<ContentWrap />} path='/' />

        <Route element={<Buttons />} path='/buttons' />

        <Route element={<Cards />} path='/cards' />

        <Route element={<Colors />} path='/colors' />

        <Route element={<Borders />} path='/borders' />

        <Route element={<Animations />} path='/animations' />

        <Route element={<View />} path='/view' />

        <Route element={<Create />} path='/create' />
      </Switch>
    </Router>
  );
}

export default SideBar;
