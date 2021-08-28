import { useState, useEffect } from "react";
import personServer from "./personServer";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";

const App = () => {
  const [ newName, setNewName] = useState('');
  const [ newNumber, setNewNumber ]= useState('');
  const [ searchTerm, setSearchTerm ] = useState('');

  const [ contacts, setContacts] = useState([]);

  useEffect(()=>{
    personServer
     .getAll()
     .then(initialPersons =>setContacts(initialPersons))    
  }, [contacts])

  const addName = (event) => {
    event.preventDefault();

    if(contacts.map(n=>n.name).includes(newName)){
      const ok = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      
      if(ok){
        const findPerson = contacts.find(n=> n.name === newName)
        personServer
          .update(findPerson.id, {...findPerson, number: newNumber})
          .then(returnPerson =>{
            setContacts(contacts.map(person => person.name === newName ? returnPerson : person))
          })
      }

      setNewName('');
      setNewNumber('');      
      return;
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    personServer
      .create(newContact)
      .then(returnedPerson => {
        setContacts(contacts.concat(returnedPerson))
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
        })

    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
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
