import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    actions.getContacts();
    // window.location.reload();
  }, []);


  const handleAddContact = () => {
    actions.addContact(
      newContact.name,
      newContact.phone,
      newContact.email,
      newContact.address
    )
    setNewContact({ name: "", phone: "", email: "", address: "" });
};

const handleInputChange = (e) => {
  setNewContact({ ...newContact, [e.target.name]: e.target.value });
};

return (
  <div className="d-flex flex-column align-items-center">
    <h1>Contact List</h1>


    <div className="contact-form text-center">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newContact.phone}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newContact.address}
          onChange={handleInputChange}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>


      <ul className="list-unstyled">
        {store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contact/${contact.id}`}>{contact.full_name}</Link>
            </li>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </ul>
    </div>
  </div>
);
};
