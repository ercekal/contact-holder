import React, {Fragment, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const {contacts, filtered} = contactContext
  console.log('filtered: ', filtered);
  return (
    <div>
      {(filtered ? filtered : contacts).map((contact, i) => <ContactItem key={i} contact={contact} />)}
    </div>
  );
};

export default Contacts;