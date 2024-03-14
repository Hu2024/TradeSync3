import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

const createNewUser = async (userData) => {
  // Simulate an asynchronous operation, e.g., making a request to a server
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated response (you can customize this based on your needs)
  return {
    success: true,
    message: "New stock created successfully",
    data: {
      fullName: userData.fullName,
      email: userData.email,
      userName: userData.username,
      password: userData.password,
    },
  };
};

const Signup = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  //   const navigate = useNavigate();

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const serverUrl = "http://localhost:3001";

    // Get form data
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      userName: e.target.userName.value,
      password: e.target.password.value,
    };

    try {
      const response = await createNewUser(formData);
      if (response.success) {
        alert(response.message);
        console.log("New Stock Data:", response.data);
        clearFields(); // Clear the form fields
        // Implement further actions, e.g., redirecting or updating state
      } else {
        alert("Failed to create new stock. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsSuccess(false);
      setMessage("Login failed");
    }
  };

  const clearFields = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div id="form-container">
      {message && (
        <div
          style={{ color: isSuccess ? "green" : "red", marginBottom: "10px" }}
        >
          {message}
        </div>
      )}

      <form id="form" ref={formRef} onSubmit={handleSubmit}>
        <h2>New User Signup</h2>

        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="userName">User Name</label>
        <input type="text" id="userName" name="userName" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <div>
          <button
            id="reset-button"
            type="button"
            onClick={clearFields}
            style={{ padding: "10px 15px" }}
          >
            Clear
          </button>
          <button
            id="submit-button"
            type="submit"
            style={{ padding: "10px 15px" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
