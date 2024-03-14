import React from "react";

// Sample mocked data
const mockedData = [
  {
    id: "AAPL",
    date: "2024-03-09",
    description: "Advance Micro Devices",
    buy: false,
    sell: true,
  },
  {
    id: "MSFT",
    date: "2024-03-09",
    description: "Microsoft",
    buy: true,
    sell: false,
  },
  {
    id: "GOOGL",
    date: "2024-03-09",
    description: "Alpha",
    buy: true,
    sell: false,
  },
  {
    id: "AMZN",
    date: "2024-03-09",
    description: "Apple",
    buy: false,
    sell: true,
  },
  {
    id: "FB",
    date: "2024-03-09",
    description: "Tesla",
    buy: true,
    sell: false,
  },
];

const History = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "40%" }}>
          {" "}
          {/* Set the container width to 50% */}
          <h2 style={{ textAlign: "left" }}>Transactions History</h2>
          <table style={{ width: "100%" }}>
            {" "}
            {/* Make the table fill the container */}
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Date</th>
                <th>Description</th>
                <th>Buy</th>
                <th>Sell</th>
              </tr>
            </thead>
            <tbody>
              {mockedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.date}</td>
                  <td>{data.description}</td>
                  <td>
                    <input type="checkbox" checked={data.buy} disabled />
                  </td>
                  <td>
                    <input type="checkbox" checked={data.sell} disabled />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
