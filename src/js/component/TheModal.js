import React from "react";

const TheModal = ({ show, contact, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Contact Information</h2>
        <p>Name: {contact.full_name}</p>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Address: {contact.address}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TheModal;
