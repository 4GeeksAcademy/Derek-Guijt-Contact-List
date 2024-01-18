import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/Contacts.css";

const Contacts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const foundContact = store.contacts.find((c) => c.id.toString() === id);
    if (foundContact) {
      setContact({
        name: foundContact.full_name,
        phone: foundContact.phone,
        email: foundContact.email,
        address: foundContact.address,
      });
    }
  }, [id, store.contacts]);

  const handleInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const saveContact = () => {
    actions.editContact(
      id,
      contact.name,
      contact.phone,
      contact.email,
      contact.address
    );
    navigate("/");
  };

  const deleteContact = () => {
    actions.deleteContact(id);
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Edit Contact</h1>

      <div className="edit-contact-form text-center">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleInputChange}
          />
          <br />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleInputChange}
          />
          <br />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={contact.address}
            onChange={handleInputChange}
          />
          <br />
          <button onClick={saveContact}>Save Changes</button>
          <button onClick={deleteContact}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
