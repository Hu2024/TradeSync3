import React, { useRef } from 'react';

// Function to simulate creating a new stock
const createNewStock = async (stockData) => {
  // Simulate an asynchronous operation, e.g., making a request to a server
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated response (you can customize this based on your needs)
  return {
    success: true,
    message: 'New stock created successfully',
    data: {
      companyName: stockData.companyName,
      stockTickerSymbol: stockData.stockTickerSymbol,
      volume: stockData.volume,
      initialPrice: stockData.initialPrice,
    },
  };
};

const NewStock = () => {
  // Ref to the form for resetting
  const formRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      companyName: e.target.companyName.value,
      stockTickerSymbol: e.target.stockTickerSymbol.value,
      volume: e.target.volume.value,
      initialPrice: e.target.initialPrice.value,
    };

    // Simulate creating a new stock
    const response = await createNewStock(formData);

    if (response.success) {
      alert(response.message);
      console.log('New Stock Data:', response.data);
      clearForm(); // Clear the form fields
      // Implement further actions, e.g., redirecting or updating state
    } else {
      alert('Failed to create new stock. Please try again.');
    }
  };

  // Function to clear the form fields
  const clearForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <main>
      <div id="form-container">
        <form id="form" ref={formRef} onSubmit={handleSubmit}>
          <h2>New Stock</h2>

          <label htmlFor="companyName">Company Name</label>
          <input type="text" id="companyName" name="companyName" required />

          <label htmlFor="stockTickerSymbol">Stock Ticker Symbol</label>
          <input type="text" id="stockTickerSymbol" name="stockTickerSymbol" required />

          <label htmlFor="volume">Volume</label>
          <input type="text" id="volume" name="volume" required />

          <label htmlFor="initialPrice">Initial Price</label>
          <input type="text" id="initialPrice" name="initialPrice" required />

          <div>
            <button id="submit-button" type="submit">Create</button>
            <button id="reset-button" type="button" onClick={clearForm}>
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewStock;