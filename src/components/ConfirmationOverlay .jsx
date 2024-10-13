import React from "react";

const ConfirmationOverlay = ({ message, onConfirm, onCancel }) => {
  return (
    <div>
      <div className="overlay" onClick={onCancel}>
        <div className="overlay-content">
          <h5>{message}</h5>
          <button className="btn btn-danger me-2" onClick={onConfirm}>
            Yes, Remove
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationOverlay;
