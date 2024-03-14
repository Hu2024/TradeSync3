// This is to load test data and run queries against the SQLite DB

const { query } = require('./db');

async function insertTestData() {
  try {
      // Inserting data into Administrators table
      const adminData = [
          ['Admin1', 'admin1@example.com', 'System Administrator'],
          ['Admin2', 'admin2@example.com', 'Stock Manager'],
          ['Admin3', 'admin3@example.com', 'Finance Manager'],
          ['Admin4', 'admin4@example.com', 'Customer Support'],
          ['Admin5', 'admin5@example.com', 'IT Support']
      ];
      for (const admin of adminData) {
          await query('INSERT INTO Administrators (FullName, Email, Role) VALUES (?, ?, ?)', admin);
      }

      // Inserting data into Users table
      const userData = [
          ['Mike Doe', 'Mikedoe', 'Mike@example.com', 'hashedpassword123'],
          ['Jane Doe', 'janedoe', 'jane@example.com', 'hashedpassword456'],
          ['Bob Smith', 'bobsmith', 'bob@example.com', 'hashedpassword789'],
          ['Alice Johnson', 'alicejohnson', 'alice@example.com', 'hashedpassword012'],
          ['Charlie Brown', 'charliebrown', 'charlie@example.com', 'hashedpassword345']
      ];
      for (const user of userData) {
          await query('INSERT INTO Users (FullName, Username, Email, Password) VALUES (?, ?, ?, ?)', user);
      }

      // Inserting data into Portfolios table
      const portfolioData = [
          [1, 1000.00],
          [2, 1500.50],
          [3, 2000.00],
          [4, 2500.75],
          [5, 3000.00]
      ];
      for (const portfolio of portfolioData) {
          await query('INSERT INTO Portfolios (UserID, CashBalance) VALUES (?, ?)', portfolio);
      }

      // Inserting data into Stocks table
      const stockData = [
          ['AAPL', 'Apple Inc.', 1000, 150.00, 1],
          ['GOOGL', 'Google LLC', 500, 2000.00, 2],
          ['MSFT', 'Microsoft Corp', 800, 250.00, 3],
          ['AMZN', 'Amazon.com Inc', 400, 3000.00, 4],
          ['FB', 'Facebook Inc', 700, 275.00, 5]
      ];
      for (const stock of stockData) {
          await query('INSERT INTO Stocks (Ticker, CompanyName, Volume, Price, AdminID) VALUES (?, ?, ?, ?, ?)', stock);
      }

      // Inserting data into StockHoldings table
      const holdingData = [
          [1, 1, 10],
          [2, 2, 15],
          [3, 3, 5],
          [4, 4, 8],
          [5, 5, 12]
      ];
      for (const holding of holdingData) {
          await query('INSERT INTO StockHoldings (PortfolioID, StockID, Quantity) VALUES (?, ?, ?)', holding);
      }

      // Inserting data into Transactions table
      const transactionData = [
          [1, 1, '2021-01-01', 'Buy', 10, 'Completed'],
          [2, 2, '2021-02-01', 'Sell', 5, 'Completed'],
          [3, 3, '2021-03-01', 'Buy', 15, 'Completed'],
          [4, 4, '2021-04-01', 'Sell', 8, 'Completed'],
          [5, 5, '2021-05-01', 'Buy', 12, 'Completed']
      ];
      for (const transaction of transactionData) {
          await query('INSERT INTO Transactions (UserID, StockID, Date, Type, Quantity, Status) VALUES (?, ?, ?, ?, ?, ?)', transaction);
      }

      console.log('Test data inserted successfully.');
  } catch (err) {
      console.error('Error inserting test data:', err);
  }
}


async function selectData() {
    try {
        const selectQuery = await query(`SELECT * FROM Portfolios;`);
        console.log('Query Results:', selectQuery);
    } catch (err) {
      console.error('Error running selectData:', err);
    }
  }
  
// Uncomment these as needed for testing
// insertTestData();  // Run this once to insert test data
//selectData(); // Run this to test selecting data
