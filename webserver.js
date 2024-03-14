//install express with 'npm install express' in terminal
//to run put 'node webserver.js' in the terminal & click the http://localhost:3000 link that pops up in the terminal

const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./dbfunctions');
const {buyStocks, sellStocks, cancelOrder} = require('./transactions');

const app = express();
const PORT = process.env.PORT || 3001;

const SECRET_KEY = 'b2f7af0e8dd61ccc8586750f7465c80507740412e5979e625492bb7329f3a179';

function validatePassword(password) {
  const minLength = 16;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[\W_]/.test(password);
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
}

//This is your login token that allows you to maintain a session as a user in TradeSync
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ***************************************************************
// For ReactJS UI.
// ***************************************************************
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/build/index.html'));
});
const cors = require('cors');
app.use(cors());
// ***************************************************************


// This will be for the API endpoints
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.UserID, email: user.Email, fullName: user.FullName }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token: token, userId: user.UserID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/register', async (req, res) => {
  const { fullName, username, email, password } = req.body;
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password does not meet the security requirements.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await db.createUser(fullName, username, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/buy', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { stockId, quantity } = req.body;
  try {
    const result = await buyStocks(userId, stockId, quantity);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/portfolio', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
      const portfolioData = await db.getCompleteUserPortfolio(userId);
      res.json(portfolioData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/api/transactions', async (req, res) => {
  const { userId } = req.query;
  try {
      const transactions = await db.getUserTransactions(userId);
      res.json(transactions);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/deposit', async (req, res) => {
  const { userId, amount } = req.body;
  try {
      await db.updateUserCashBalance(userId, amount);
      res.json({ message: 'Deposit successful' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/withdraw', async (req, res) => {
  const { userId, amount } = req.body;
  try {
      await db.updateUserCashBalance(userId, -amount);
      res.json({ message: 'Withdrawal successful' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/sell', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { stockId, quantity } = req.body;
  try {
    const result = await sellStocks(userId, stockId, quantity);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/cancel', authenticateToken, async (req, res) => {
  const { transactionId } = req.body;
  try {
    const result = await cancelOrder(transactionId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await db.getAllStocks();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*app.get('/api/portfolio', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const portfolio = await db.getUserPortfolio(userId);
  if (!portfolio) {
    return res.status(404).json({ message: 'Portfolio not found' });
  }
  res.json(portfolio);
});*/

app.post('/update-password', async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    const result = await db.updateUserPassword(username, newPassword);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/portfolio', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const portfolioData = await db.getCompleteUserPortfolio(userId);
    res.json(portfolioData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
