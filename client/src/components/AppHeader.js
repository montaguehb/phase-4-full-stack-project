import React from 'react';
import {Header, Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import Nav from "./Nav";
const AppHeader = () => {
    return(
        <Menu >
            <Link to = '/'>
                <Header as='h1'>FlatTicket</Header>
            </Link>
            <Nav/>
        </Menu>
    )
}

export default AppHeader