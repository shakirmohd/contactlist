import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../redux/actions/contactActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import log from "loglevel";

import "./EditContact.css";

const EditContact = () => {
  const { id } = useParams();
  const contacts = useSelector((state) => state?.contacts?.contacts);
  const contact = contacts.find((contact) => contact.id === id);

  const [name, setName] = useState(contact.name);
  const [type, setType] = useState(contact.type);
  const [gender, setGender] = useState(contact.gender);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!type) errors.type = "Type is required";
    if (!gender) errors.gender = "Gender is required";
    if (!email) errors.email = "Email is required";
    if (!phone) errors.phone = "Phone number is required";
    if (phone.length < 10)
      errors.phone = "Phone number must be at least 10 digits";
    if (contacts.some((contact) => contact.name === name && contact.id !== id))
      errors.name = "Name already exists";
    if (
      contacts.some((contact) => contact.phone === phone && contact.id !== id)
    )
      errors.phone = "Phone number already exists";
    if (
      contacts.some((contact) => contact.email === email && contact.id !== id)
    )
      errors.email = "Email already exists";
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors above.");
      log.error("Validation errors:", validationErrors);
      return;
    }

    dispatch(editContact({ id: contact.id, name, type, gender, email, phone }));
    toast.success("Contact updated successfully!");
    navigate("/");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Edit Contact</h2>
      <div className="form-content-container">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            placeholder="Name"
            className="form-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Phone:</label>
          <input
            type="tel"
            placeholder="Phone Number"
            className="form-input"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            placeholder="Email Address"
            className="form-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Gender:</label>
          <select
            className="form-select"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="form-error">{errors.gender}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Type:</label>
          <select
            className="form-select"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="business">Business</option>
          </select>
          {errors.type && <p className="form-error">{errors.type}</p>}
        </div>
        <button type="submit" className="form-button">
          Save Contact
        </button>
      </div>
    </form>
  );
};

export default EditContact;
