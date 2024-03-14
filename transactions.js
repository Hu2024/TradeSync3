const db = require('./dbfunctions');

async function buyStocks(userId, stockId, quantity) {
  try {
    const stock = await db.getStockById(stockId);
    const portfolio = await db.getUserPortfolio(userId);

    if (!stock || !portfolio) {
      throw new Error("Stock or portfolio not found");
    }

    const totalCost = stock.Price * quantity;
    if (portfolio.CashBalance < totalCost) {
      throw new Error("Insufficient funds");
    }

    await db.updateUserCashBalance(userId, -totalCost);
    await db.addStockHolding(userId, stockId, quantity);
    const transactionId = await db.addTransaction(userId, stockId, 'Buy', quantity, 'Completed');

    return { success: true, message: 'Stocks purchased successfully', transactionId };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function sellStocks(userId, stockId, quantity) {
  try {
    const stock = await db.getStockById(stockId);
    const holding = await db.getStockHolding(userId, stockId);

    if (!stock || !holding || holding.Quantity < quantity) {
      throw new Error("Stock, portfolio not found, or insufficient stock quantity");
    }

    await db.updateUserCashBalance(userId, stock.Price * quantity);
    await db.updateStockHolding(userId, stockId, -quantity);
    const transactionId = await db.addTransaction(userId, stockId, 'Sell', quantity, 'Completed');

    return { success: true, message: 'Stocks sold successfully', transactionId };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function cancelOrder(transactionId) {
  try {
    const transaction = await db.getTransactionById(transactionId);
    if (!transaction || transaction.Status !== 'Pending') {
      throw new Error("Order not found or already completed");
    }

    await db.updateTransactionStatus(transactionId, 'Cancelled');
    return { success: true, message: 'Order cancelled successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  buyStocks,
  sellStocks,
  cancelOrder
};
