import React, {Fragment, useContext, useEffect} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const {contacts, filtered, getContacts} = contactContext
  useEffect(() => {
    getContacts()
  }, [])
  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <div>
      <TransitionGroup>
        {(filtered ? filtered : contacts).map(contact =>
          <CSSTransition
            key={contact.id}
            timeout={500}
            classNames="item"
              >
            <ContactItem contact={contact} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default Contacts;