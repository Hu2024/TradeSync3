// This initializes the TradeSync database with SQLite

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./TradeSync.db');

const createTables = `
CREATE TABLE Administrators (
    AdminID INTEGER PRIMARY KEY,
    FullName TEXT NOT NULL,
    Email TEXT NOT NULL,
    Role TEXT
);

CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    FullName TEXT NOT NULL,
    Username TEXT NOT NULL UNIQUE,
    Email TEXT NOT NULL,
    Password TEXT NOT NULL
);

CREATE TABLE Portfolios (
    PortfolioID INTEGER PRIMARY KEY,
    UserID INTEGER NOT NULL,
    CashBalance REAL NOT NULL,
    FOREIGN KEY(UserID) REFERENCES Users(UserID)
);

CREATE TABLE Stocks (
    StockID INTEGER PRIMARY KEY,
    Ticker TEXT NOT NULL,
    CompanyName TEXT,
    Volume INTEGER,
    Price REAL NOT NULL,
    AdminID INTEGER NOT NULL,
    FOREIGN KEY(AdminID) REFERENCES Administrators(AdminID)
);

CREATE TABLE StockHoldings (
    HoldingID INTEGER PRIMARY KEY,
    PortfolioID INTEGER NOT NULL,
    StockID INTEGER NOT NULL,
    Quantity INTEGER,
    FOREIGN KEY(PortfolioID) REFERENCES Portfolios(PortfolioID),
    FOREIGN KEY(StockID) REFERENCES Stocks(StockID)
);

CREATE TABLE Transactions (
    TransactionID INTEGER PRIMARY KEY,
    UserID INTEGER NOT NULL,
    StockID INTEGER NOT NULL,
    Date TEXT,
    Type TEXT NOT NULL,
    Quantity INTEGER NOT NULL,
    Status TEXT,
    FOREIGN KEY(UserID) REFERENCES Users(UserID),
    FOREIGN KEY(StockID) REFERENCES Stocks(StockID)
);
`;

db.serialize(() => {
  db.exec("PRAGMA foreign_keys = ON");
  db.exec(createTables, (err) => {
    if (err) {
      console.error("Error creating tables:", err);
    } else {
      console.log("Tables created successfully");
      db.close(); // Close the database connection here
    }
  });
});
