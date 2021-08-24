import { useState, useEffect } from 'react';
import ContactItem from '../contact-item/ContactItem';
import ContactForm from '../contact-form/ContactForm';

import contactsService from '../../../services/contacts-service';

function ContactList () {

  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

/*  CON DATA.JSON
   useEffect(() => {
    setContacts(contactsData)
  }, []) */
 
  useEffect(() => {
    fetchContacts()
  }, [])

  function fetchContacts() {
    contactsService.list()
          .then(contacts => {
            setContacts(contacts)
          })
          .catch(error => {
            console.error(error)
          }) 
  }
 

  //ESTA ES LA MISMA FUNCIÓN QUE LA DE ABAJO//
  //const handleDeleteContact = (id) => setContacts(contacts.filter(contact => contact.id !== id))
  //Esta es con data.json
  //function handleDeleteContact (id) {
  //  setContacts(contacts.filter(contact => contact.id !== id))
  //}
  //Esta es con la API
  function handleDeleteContact (id) {
    contactsService.remove(id)
                  .then(() =>fetchContacts())
                  .catch(error => console.error(error))
    
  }
//

function handleCreateContact(contact) {
  setContacts([contact, ...contacts])
}

 
    return (
      contacts &&
        <>
          <div className="row mb-2">
            <div className="col">
              <ContactForm onCreateContact={(contact) => handleCreateContact(contact)}/>
            </div>
          </div>
          {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
            <div className="row mb-2">
              <div className="col">
                <ul className="list-group">
                  {contacts.map(contact =>
                    <li key={contact.id} className="list-group-item list-group-item-action">
                      <ContactItem {...contact} onDeleteContact={(id) => handleDeleteContact(id)} />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </>
    );
  }



export default ContactList;
