import React from 'react';
import {Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const Footer = () =>{
    return (
        <div>
            <Link to ='/'>
                <Header as='h2' icon='ticket alternate' content='FlatTicket'/>
            </Link>
        </div>
    )
}

export default Footer