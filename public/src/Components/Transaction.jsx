import React, { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]); // Initialize as an array

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/transactions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data); // Expecting 'data' to be an array of transactions
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>
          {" "}
          {/* Adjusted the container width */}
          <h2 style={{ textAlign: "left" }}>Transactions History</h2>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Id</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.Date}</td>
                  <td>{transaction.TransactionID}</td>{" "}
                  {/* Assuming field name */}
                  <td>{transaction.StockID}</td>
                  <td>{transaction.Type}</td>
                  <td>{transaction.Quantity}</td>
                  <td>{transaction.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
