import React from 'react'

const Persons = ({contacts, searchTerm, deletePerson}) => {

  return (
    <div>
      <h1>Numbers</h1>        
      { contacts
        .filter(n => (n.name.toLowerCase()).startsWith(searchTerm.toLowerCase()) )
        .map(person =><li key={person.name}>{person.name} {person.number} <button onClick={()=>deletePerson(person)}>delete</button></li>)
      }
      
    </div>
  )
}

export default Persons
