import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Smooth } from "../context";

function Navbar() {
  const navigate = useNavigate();
  const { data, setData } = useContext(Smooth);

  function logout() {
    localStorage.clear();
    setData((prev) => ({ ...prev, metaInfo: null }));
    navigate("/login");
  }
  return (
    <>
      {/* our */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <Link to="/" className="navbar-brand mx-4">
            Smooth Book Hotel
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav" style={{ marginRight: "30px" }}>
              {data.metaInfo ? (
                <>
                  <span
                    style={{
                      color: "white",
                      padding: "4px 10px",
                      fontSize: "16px",
                    }}
                  >
                    Welcome, {data.metaInfo?.name}
                  </span>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      App Setting&nbsp;&nbsp;&nbsp;&nbsp;
                      <i className="fa-solid fa-gear"></i>&nbsp;&nbsp;
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {data.metaInfo?.role === "user" ? (
                        <>
                          <li>
                            <Link className="dropdown-item" to="/profile">
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/orderfood">
                              Order Food
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/complaint">
                              Complaint
                            </Link>
                          </li>
                        </>
                      ) : null}
                      {data.metaInfo.role === "admin" ? (
                        <>
                          <li>
                            <Link className="dropdown-item" to="/admin">
                              Admin
                            </Link>
                          </li>
                        </>
                      ) : null}

                      {data.metaInfo.role === "manager" ? (
                        <>
                          <li>
                            <Link className="dropdown-item" to="/manager">
                              Manager
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/orderfood">
                              Order Food
                            </Link>
                          </li>
                        </>
                      ) : null}
                      <li>
                        <span className="dropdown-item" onClick={logout}>
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
