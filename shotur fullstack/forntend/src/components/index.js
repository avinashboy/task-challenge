import React from "react";
import NavHeader from "./NavHeader";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function index() {
  return (
    <>
      <Router>
        <NavHeader />
        <ToastContainer />
        <Switch>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forgot' element={<ForgotPassword />} />
        </Switch>
      </Router>
    </>
  );
}

export default index;
