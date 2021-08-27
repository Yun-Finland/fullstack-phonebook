import { useState, useEffect } from "react";
import axios from 'axios';

const Filter = ({searchTerm, setSearchTerm})=>{
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)}/>
    </div>
  )
}

const PersonForm = ({addName, newName, setNewName, newNumber, setNewNumber}) => {
  return(
    <div>
      <h1>Add a new</h1>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={(event)=> setNewName(event.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={(event)=>setNewNumber(event.target.value)} /></div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const Persons = ({contacts, searchTerm}) => {
  return (
    <div>
      <h1>Numbers</h1>
      {contacts
        .filter(n => (n.name.toLowerCase()).startsWith(searchTerm.toLowerCase()) )
        .map(n =><li key={n.name}>{n.name} {n.number}</li>)
      }
    </div>
  )
}

const App = () => {
  const [ newName, setNewName] = useState('');
  const [ newNumber, setNewNumber ]= useState('');
  const [ searchTerm, setSearchTerm ] = useState('');

  const [ contacts, setContacts] = useState([]);

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setContacts(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();

    if(contacts.map(n=>n.name).includes(newName)){
      window.alert(`${newName} is already added to the phonebook!`)
      setNewName('');
      setNewNumber('');
      return;
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    setContacts(contacts.concat(newContact));
    setNewName('');
    setNewNumber('');
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
      />

 
    </div>
  )
}

export default App;
