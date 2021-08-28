import React from 'react'

const Filter = ({searchTerm, setSearchTerm})=>{
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)}/>
    </div>
  )
}

export default Filter
