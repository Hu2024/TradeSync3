import React, { useState, useEffect } from "react";
import { parseJwt } from "../utils/utils.js";

const Withdraw = () => {
  // const savingsBalance = 5000;
  const delayPeriod = 1000;

  const [accountType, setAccountType] = useState("cash");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [portfolio, setPortfolio] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/portfolio`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Example of adding a token from localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio");
        }

        const data = await response.json();
        setPortfolio(data);
        setIsLoading(false);
      } catch (error) {
        // setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(async () => {
      try {
        // Call api to submit the withdrawal request
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem("token");
        const userId = parseJwt(token).userId;

        const response = await fetch(`${apiUrl}/api/withdraw`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Example of adding a token from localStorage
          },
          body: JSON.stringify({ userId: userId, amount: withdrawAmount }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio");
        }

        const data = await response.json();
        console.log(data);

        setMessage("Successfully completed withdrawal");
        setPortfolio(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Login error:", error);
        setMessage("Failed to complete Withdrawal.");
        setIsLoading(false);
      }
    }, delayPeriod);
  };

  const clearForm = () => {
    setWithdrawAmount("");
    setAccountType("checking");
    setMessage("");
  };

  return (
    <main>
      <div id="form-container">
        <form id="form" onSubmit={handleSubmit}>
          <h2>Withdraw Cash</h2>

          <label htmlFor="AccountType">Account Type</label>
          <select
            value={accountType}
            disabled={isLoading}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="checking">
              Checking (Balance: ${portfolio.CashBalance})
            </option>
            {/* <option value="savings">
              Savings (Balance: ${savingsBalance})
            </option> */}
          </select>

          <label htmlFor="WithdrawAmount">Enter Amount</label>
          <input
            type="number"
            id="WithdrawAmount"
            value={withdrawAmount}
            name="amount"
            disabled={isLoading}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <button id="submit-button" type="submit" disabled={isLoading}>
              Submit
            </button>
            <button
              id="reset-button"
              type="button"
              onClick={clearForm}
              disabled={isLoading}
            >
              Reset
            </button>
          </div>
        </form>
        {message && (
          <p style={{ color: message.includes("failed") ? "red" : "green" }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
};

export default Withdraw;
