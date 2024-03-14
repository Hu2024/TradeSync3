import React from "react";
import { Link } from "react-router-dom";

const Customer = () => {
  const buttonStyle = {
    backgroundColor: "#022B3A", // Button background color
    color: "White", // Text color
    padding: "10px 20px", // Padding inside the buttons
    margin: "5px", // Margin between the buttons
    border: "none", // No border
    cursor: "pointer", // Cursor changes to pointer on hover
    fontWeight: "bold", // Make text bold
    height: "100px",
    width: "150px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <div>
        <button style={buttonStyle}>
          <Link
            to="/transaction"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Trade Stocks
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link
            to="/portfolio"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            View Portfolio
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link
            to="/transactions"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Transactions
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link
            to="/deposit"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Deposit
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link
            to="/withdraw"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Withdraw
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Customer;
