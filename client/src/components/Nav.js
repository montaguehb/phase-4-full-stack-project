import React from 'react'
import Search from './Search'
import {Header, Menu} from 'semantic-ui-react';
const Nav = () => {
  return (
    <Menu id="nav">
        <img src='https://placehold.co/200x100' alt="placeholder"></img>
        <Search></Search>  
    </Menu>
  )
}

export default Nav