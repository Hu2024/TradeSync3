import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const today = new Date().toISOString().split("T")[0];
  const [valueFrom, setValueFrom] = useState(`${today}T00:00`);
  const [valueTo, setValueTo] = useState(`${today}T23:00`);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Your form submission logic here
      console.log("Submitting:", valueFrom, valueTo);

      // todo: add API call to set new schedule.
    } catch (error) {
      console.error("Failed to change schedule. Error:", error);
    }
  };

  return (
    <div id="form-container">
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <h2>Change Schedule</h2>
        <label>
          New Start Time:
          <input
            aria-label="Date and time from"
            type="datetime-local"
            value={valueFrom}
            className="default-time-picker"
            onChange={(e) => setValueFrom(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          New End Time:
          <input
            aria-label="Date and time to"
            type="datetime-local"
            value={valueTo}
            className="default-time-picker"
            onChange={(e) => setValueTo(e.target.value)}
          />
        </label>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            style={{ padding: "10px 15px" }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Schedule;
