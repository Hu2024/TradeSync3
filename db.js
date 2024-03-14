// This integrates SQLite for all database transactions

const sqlite3 = require('sqlite3').verbose();

// Open the TradeSync database; the file is created if it does not exist
const db = new sqlite3.Database('./TradeSync.db', (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the TradeSync SQLite database.');
});

// Function to execute a query and return results
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Error executing SQL:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Function to close the database connection
function close() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Closed the database connection.');
    }
  });
}

// Example usage of the query function
async function testConnection() {
  try {
    const result = await query('SELECT sqlite_version() AS version');
    console.log('SQLite version:', result[0].version);
  } catch (err) {
    console.error('Failed to execute test query.', err);
  }
}

// Exporting the query function and the close function
module.exports = {
  query,
  close,
  testConnection
};

// Call the test function to check the connection
//testConnection();
