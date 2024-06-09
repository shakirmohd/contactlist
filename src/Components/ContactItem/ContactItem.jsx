import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/actions/contactActions";
import { toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import "./ContactItem.css";

const ContactItem = (props) => {
  const { contactItem } = props;
  const { id, name, email, phone, type, gender } = contactItem;
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    toast.success("Contact deleted successfully!")
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <li className="contact-list-item">
      <div className="contact-item-container">
        <div className="contact-details-container">
          <div className="contact-label-container">
            <p className="contact-label-text">Name: </p>
            <p className="contact-value-text">{name}</p>
          </div>
          <div className="contact-label-container">
            <p className="contact-label-text">Gender: </p>
            <p className="contact-value-text">
              {capitalizeFirstLetter(gender)}
            </p>
          </div>
          <div className="contact-label-container">
            <p className="contact-label-text">Phone: </p>
            <p className="contact-value-text">{phone}</p>
          </div>
          <div className="contact-label-container">
            <p className="contact-label-text">Email:</p>
            <p className="contact-value-text">{email}</p>
          </div>
          <div className="contact-label-container">
            <p className="contact-label-text">Contact Type:</p>
            <p className="contact-value-text">{capitalizeFirstLetter(type)}</p>
          </div>
        </div>
        <div className="item-button-container">
          <Link className="edit-button" to={`/edit/${id}`}>
            <FaUserEdit className="edit-item-icon" /> Edit Contact
          </Link>
          <button className="delete-button" onClick={() => handleDelete(id)}>
            <MdDeleteOutline className="delete-item-icon" /> Delete Contact
          </button>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
