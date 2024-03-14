// This is to test if you have a connection to the SQLite DB

const sqlite3 = require('sqlite3').verbose();

// Open the database
const db = new sqlite3.Database('./TradeSync.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the TradeSync database.');
});

// Test query: Select all users (or any table you wish to test)
const testQuery = `SELECT * FROM Users`;

// Execute the test query
db.all(testQuery, [], (err, rows) => {
  if (err) {
    throw err;
  }
  // Log the rows returned by the query
  console.log(rows);
  // If you get an empty array, it means the connection and query were successful but the table is empty
  // If you get actual data, it means the table has data and everything is working fine
});

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error('Error closing database:', err.message);
  }
  console.log('Closed the database connection.');
});
