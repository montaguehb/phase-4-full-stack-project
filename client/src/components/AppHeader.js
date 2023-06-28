import React from 'react';
import {Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import Nav from "./Nav";

const AppHeader = () => {
    return(
        <div >
            <Link to = '/'>
                <Header as='h1'>FlatTicket</Header>
            </Link>
            <Nav/>
        </div>
    )
}

export default AppHeader