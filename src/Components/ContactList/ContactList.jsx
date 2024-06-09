import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import ContactItem from "../ContactItem/ContactItem"
import "./ContactList.css"

const ContactList = (props) => {
  const { searchQuery, showStatistics, sortOrder } = props
  const contacts = useSelector((state) => state?.contacts?.contacts)
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })

  const renderStatistics = () => {
    const totalContacts = contacts.length
    const maleContacts = contacts.filter(
      (contact) => contact.gender === "male"
    ).length
    const femaleContacts = contacts.filter(
      (contact) => contact.gender === "female"
    ).length
    const personalContacts = contacts.filter(
      (contact) => contact.type === "personal"
    ).length
    const businessContacts = contacts.filter(
      (contact) => contact.type === "business"
    ).length

    return (
      <div className="stats-container">
        <div className="stats-content-container">
          <div className="stats-item-container">
            <p className="stats-label">Male Contacts: </p>
            <p className="stats-item">{maleContacts}</p>
          </div>
          <div className="stats-item-container">
            <p className="stats-label">Female Contacts:</p>
            <p className="stats-item">{femaleContacts}</p>
          </div>
          <div className="stats-item-container">
            <p className="stats-label">Personal Contacts:</p>
            <p className="stats-item">{personalContacts}</p>
          </div>
          <div className="stats-item-container">
            <p className="stats-label">Business Contacts:</p>
            <p className="stats-item">{businessContacts}</p>
          </div>
          <div className="stats-item-container">
            <p className='stats-label'>Total Contacts:</p>
            <p className='stats-item'>{totalContacts}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderAddContactButton = () => (
    <div className="action-buttons-container">
      <Link className="action-button" to="/add">
      Add New Contact
    </Link>
    </div>
  )


  const renderListHeader = () => (
    <div className="list-header-container">
      <h1 className="contact-list-title">Contact List</h1>
      {showStatistics && renderStatistics()}
    </div>
  )

  const renderNoDataFoundView = () => {
    const noDataFound = require('../Assets/Images/no-data-found.jpg')

    return(
      <div className="no-data-found-container">
        <img className="no-data-found-img" src={noDataFound} alt='No Data Found' />
        <p className="no-data-found-label">No Data Found</p>
      </div>
    )
  }

  const renderList = () => (
    <ul className="items-list-container">
      {sortedContacts.length > 0
        ? sortedContacts.map((contact) => (
            <ContactItem contactItem={contact} key={contact.id} />
          ))
        : renderNoDataFoundView()}
    </ul>
  )

  const renderContactList = () => (
    <div className="list-container">
      {renderListHeader()}
      {renderList()}
    </div>
  )

  return (
    <div className="contact-list-container">
      <div className="contact-list-content-container">
        {renderAddContactButton()}
        {renderContactList()}
      </div>
    </div>
  )
}

export default ContactList
