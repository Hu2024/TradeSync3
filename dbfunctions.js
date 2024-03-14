// This is to create DB transactions when events happens

const sqlite3 = require('sqlite3').verbose();
const dbPath = './TradeSync.db';
let db = new sqlite3.Database(dbPath);
const bcrypt = require('bcrypt');

const getStockById = (stockId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM Stocks WHERE StockID = ?`, [stockId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const updateUserPassword = async (username, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return new Promise((resolve, reject) => {
    const sql = `UPDATE Users SET Password = ? WHERE Username = ?`;
    db.run(sql, [hashedPassword, username], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Password updated successfully' });
      }
    });
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM Users WHERE Username = ?`, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const createUser = async (fullName, username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO Users (FullName, Username, Email, Password) VALUES (?, ?, ?, ?)`;
    db.run(sql, [fullName, username, email, hashedPassword], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

//Need to change the name of this function or delete
const buyStock = (userId, stockId, quantity) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Transactions (UserID, StockID, Type, Quantity, Date, Status) VALUES (?, ?, 'Buy', ?, date('now'), 'Pending')`;
      db.run(sql, [userId, stockId, quantity], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  };
//Need to change the name of this function or delete
  const sellStock = (userId, stockId, quantity) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Transactions (UserID, StockID, Type, Quantity, Date, Status) VALUES (?, ?, 'Sell', ?, date('now'), 'Pending')`;
      db.run(sql, [userId, stockId, quantity], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  };
  //Need to change the name of this function or delete  
  const cancelTransaction = (transactionId) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Transactions SET Status = 'Cancelled' WHERE TransactionID = ?`;
      db.run(sql, [transactionId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  };

  const getUserPortfolio = (userId) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Portfolios WHERE UserID = ?`, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  const getUserTransactions = (userId) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Transactions WHERE UserID = ? ORDER BY Date DESC`, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  const updateUserCashBalance = (userId, amount) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Portfolios SET CashBalance = CashBalance + ? WHERE UserID = ?`;
      db.run(sql, [amount, userId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  };

  const createStock = (ticker, companyName, volume, price, adminId) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Stocks (Ticker, CompanyName, Volume, Price, AdminID) VALUES (?, ?, ?, ?, ?)`;
      db.run(sql, [ticker, companyName, volume, price, adminId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  };
  
  const updateStock = (stockId, newPrice) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Stocks SET Price = ? WHERE StockID = ?`;
      db.run(sql, [newPrice, stockId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  };
  
  const getAllStocks = () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Stocks`, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };
  
  const addStockHolding = async (userId, stockId, quantity) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM StockHoldings WHERE PortfolioID = (SELECT PortfolioID FROM Portfolios WHERE UserID = ?) AND StockID = ?`, [userId, stockId], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          const newQuantity = row.Quantity + quantity;
          db.run(`UPDATE StockHoldings SET Quantity = ? WHERE HoldingID = ?`, [newQuantity, row.HoldingID], function(err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.changes);
            }
          });
        } else {
          db.run(`INSERT INTO StockHoldings (PortfolioID, StockID, Quantity) VALUES ((SELECT PortfolioID FROM Portfolios WHERE UserID = ?), ?, ?)`, [userId, stockId, quantity], function(err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          });
        }
      });
    });
  };

  const addTransaction = async (userId, stockId, type, quantity, status) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Transactions (UserID, StockID, Type, Quantity, Date, Status) VALUES (?, ?, ?, ?, datetime('now'), ?)`;
      db.run(sql, [userId, stockId, type, quantity, status], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  };

  const updateStockHolding = async (userId, stockId, quantityChange) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM StockHoldings WHERE PortfolioID = (SELECT PortfolioID FROM Portfolios WHERE UserID = ?) AND StockID = ?`, [userId, stockId], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          const newQuantity = row.Quantity + quantityChange;
          if (newQuantity > 0) {
            db.run(`UPDATE StockHoldings SET Quantity = ? WHERE HoldingID = ?`, [newQuantity, row.HoldingID], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve(this.changes);
              }
            });
          } else {
            db.run(`DELETE FROM StockHoldings WHERE HoldingID = ?`, [row.HoldingID], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve(this.changes);
              }
            });
          }
        } else {
          reject(new Error("No stock holding found for this user and stock ID."));
        }
      });
    });
  };

  const getStockHolding = async (userId, stockId) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT PortfolioID FROM Portfolios WHERE UserID = ?`, [userId], (err, portfolio) => {
        if (err) {
          reject(err);
        } else if (portfolio) {
          db.get(`SELECT * FROM StockHoldings WHERE PortfolioID = ? AND StockID = ?`, [portfolio.PortfolioID, stockId], (err, holding) => {
            if (err) {
              reject(err);
            } else {
              resolve(holding);
            }
          });
        } else {
          reject(new Error("Portfolio not found for this user."));
        }
      });
    });
  };
  
  const getTransactionById = (transactionId) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Transactions WHERE TransactionID = ?`, [transactionId], (err, transaction) => {
        if (err) {
          reject(err);
        } else {
          resolve(transaction);
        }
      });
    });
  };
  
  const updateTransactionStatus = (transactionId, newStatus) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Transactions SET Status = ? WHERE TransactionID = ?`;
      db.run(sql, [newStatus, transactionId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'Transaction status updated successfully', transactionId, newStatus });
        }
      });
    });
  };
  
  const getUserCashBalance = (userId) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT CashBalance FROM Portfolios WHERE UserID = ?`, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.CashBalance);
            }
        });
    });
};

async function getPortfolioData(userId) {
  try {
      const portfolio = await db.getUserPortfolio(userId);
      const stockHoldings = await Promise.all(portfolio.map(async (holding) => {
          const stock = await db.getStockById(holding.StockID);
          return {
              ...holding,
              stockName: stock.Ticker,
              currentPrice: stock.Price,
              marketValue: holding.Quantity * stock.Price
          };
      }));

      const cashBalance = await db.getUserCashBalance(userId);

      return {
          stockHoldings,
          cashBalance
      };
  } catch (error) {
      console.error(error);
      throw error;
  }
}

const getCompleteUserPortfolio = async (userId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT CashBalance FROM Portfolios WHERE UserID = ?`, [userId], (err, portfolio) => {
      if (err) {
        console.error("Error fetching portfolio:", err);
        reject(err);
      } else if (portfolio) {
        db.all(`
          SELECT sh.Quantity, s.Ticker, s.Price
          FROM StockHoldings sh
          JOIN Stocks s ON sh.StockID = s.StockID
          WHERE sh.PortfolioID = (SELECT PortfolioID FROM Portfolios WHERE UserID = ?)
        `, [userId], (err, holdings) => {
          if (err) {
            console.error("Error fetching holdings:", err);
            reject(err);
          } else {
            resolve({
              CashBalance: portfolio.CashBalance,
              StockHoldings: holdings
            });
          }
        });
      } else {
        reject(new Error("Portfolio not found for this user."));
      }
    });
  });
};


  // Implement other functions as DB interactions are needed.

// Close database connection
const closeDb = () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
};

module.exports = {
    getUserByUsername,
    createUser,
    buyStock,
    sellStock,
    cancelTransaction,
    getUserPortfolio,
    getUserTransactions,
    updateUserCashBalance,
    createStock,
    updateStock,
    closeDb,
    getAllStocks,
    updateUserPassword,
    getStockById,
    addStockHolding,
    addTransaction,
    updateStockHolding,
    getStockHolding,
    getTransactionById,
    updateTransactionStatus,
    getUserCashBalance,
    getPortfolioData,
    getCompleteUserPortfolio
};
