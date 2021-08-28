import { useState, useEffect } from "react";
import personServer from "./personServer";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";

const Notification = ({notify, setNotify}) => {
  
  if(!notify.message){
    return null
  }

  setTimeout(()=>{
    setNotify({status: null, message: null })
  }, 5000)

  return (
    <div className={notify.status}>
      {notify.message}
    </div>
  )
}

const App = () => {
  const [ newName, setNewName] = useState('');
  const [ newNumber, setNewNumber ]= useState('');
  const [ searchTerm, setSearchTerm ] = useState('');

  const [ contacts, setContacts] = useState([]);

  const [ notify, setNotify ] = useState({
    status: null,
    message: null
  })

  useEffect(()=>{
    personServer
     .getAll()
     .then(initialPersons =>setContacts(initialPersons))    
  }, [notify])

  const addName = (event) => {
    event.preventDefault();

    //check if the name already exists, if exists, confirm to update or keep it unchanged
    const findPerson = contacts.find(n=> n.name === newName)
    if(findPerson){
      const ok = window.confirm(`${findPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      
      if(ok){
        personServer
          .update(findPerson.id, {...findPerson, number: newNumber})
          .then(returnPerson =>{
            setContacts(contacts.map(person => person.name === newName ? returnPerson : person))
            setNotify({status: "success", message: `${findPerson.name} has been updated!` })
          })
          .catch(error => {
            console.log(error.message)
            setNotify({status: "error", message: `${findPerson.name} has been deleted already.` })
          })
      }

      setNewName('');
      setNewNumber('');      
      return;
    }

    // add a new contact info
    const newContact = {
      name: newName,
      number: newNumber
    }

    personServer
      .create(newContact)
      .then(returnedPerson => {
        setContacts(contacts.concat(returnedPerson))
        setNotify({status: "success", message: `Added ${newName} Successfully!` })
        setNewName('');
        setNewNumber('');
      })
  }

  const deletePerson = (person) => {
    const ok = window.confirm(`Delete ${person.name}`)

    if(ok){
      personServer
        .remove(person.id)
        .then(returnedPerson => {
          setContacts(contacts.filter(person => (person.id !==returnedPerson.id)))
          setNotify({status: "error", message: `${person.name} has been removed!` })
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notify={notify} setNotify={setNotify} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      
      <Persons 
        contacts={contacts}
        searchTerm={searchTerm}
        deletePerson = {deletePerson}
      />

    </div>
  )
}

export default App;
