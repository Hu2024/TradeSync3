import React from "react";

// Sample mocked data
const mockedData = [
  { stock: "AAPL", shares: 10, marketValue: "$1350" },
  { stock: "MSFT", shares: 15, marketValue: "$2250" },
  { stock: "GOOGL", shares: 8, marketValue: "$2400" },
  { stock: "AMZN", shares: 5, marketValue: "$1650" },
  { stock: "FB", shares: 20, marketValue: "$3100" },
];

const Portfolio = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "40%" }}>
          {" "}
          {/* Set the container width to 50% */}
          <h2 style={{ textAlign: "left" }}>Stock Portfolio</h2>
          <table style={{ width: "100%" }}>
            {" "}
            {/* Make the table fill the container */}
            <thead>
              <tr>
                <th>Stock</th>
                <th>Share</th>
                <th>Market Value</th>
              </tr>
            </thead>
            <tbody>
              {mockedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.stock}</td>
                  <td>{data.shares}</td>
                  <td>{data.marketValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
