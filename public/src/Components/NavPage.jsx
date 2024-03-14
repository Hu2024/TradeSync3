import logo from "../logo2.png";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavPage = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="container"
      style={
        {
          // display: "flex",
          // // justifyContent: "space-between",
          // // alignItems: "center",
          // padding: "10px",
          // backgroundColor: "#022B3A",
        }
      }
    >
      <div
        className="row"
        style={{
          display: "flex",
          // justifyContent: "space-between",
          // alignItems: "center",
          padding: "10px",
          backgroundColor: "#022B3A",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", color: "white" }}
          className="col-2"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ marginRight: "5px", width: "85px" }}
          />
          <h1>TradeSync</h1>
        </div>

        <div
          className="col-6"
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
            marginLeft: "-10%",
          }}
        >
          <nav style={{ fontSize: "1.5em" }}>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "center",
                gap: "45px",
              }}
            >
              <li>
                <Link
                  to="/dashboard"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/administrator"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Administrator
                </Link>
              </li>
              <li>
                <Link
                  to="/customer"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Customer
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {isAuthenticated && currentUser ? (
          <>
            <div
              className="col-4"
              style={{
                color: "white",
                marginRight: "10px",
                alignSelf: "center",
              }}
            >
              <div style={{ fontWeight: "bolder" }}>{currentUser}</div>
            </div>
            <button type="button" onClick={handleLogout}>
              <span style={{ textDecoration: "underline" }}>Logout</span>
            </button>
          </>
        ) : (
          <div className="col-4" style={{ alignSelf: "center" }}>
            <button>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavPage;
