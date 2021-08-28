import React from 'react'

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

export default PersonForm
