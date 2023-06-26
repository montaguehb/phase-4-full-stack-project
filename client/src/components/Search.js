import {React, useState} from 'react'

const Search = () => {
    const [search, setSearch] = useState()
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

  return (
    <form>
        <label>
            Search: 
            <input type="text" value={search} onChange={handleChange}></input>
        </label> 
    </form>
  )
}

export default Search