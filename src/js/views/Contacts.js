import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/Contacts.css";

const Contacts = () => {
  let { id }  = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");

  const loadContact = () => {
    fetch("https://playground.4geeks.com/apis/fake/contact/" + id)
    .then(response => response.json())
    .then(data => {
      setname(data.full_name)
      setaddress(data.address)
      setemail(data.email)
      setphone(data.phone)
    });
  }
  const editingContact = (e) => {
    e.preventDefault()
    console.log(name,email,phone,address)
    actions.editContact(id, name, phone, email, address)
    setname("")
    setaddress("")
    setemail("")
    setphone("")
    navigate("/")
  }
  useEffect(() => {
   loadContact()
  }, []);

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
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <br />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
          <br />
          <button onClick={(e) => editingContact(e)}>Save Changes</button>
          <button onClick={() => deleteContact(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
