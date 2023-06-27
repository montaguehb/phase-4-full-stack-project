import React from 'react';
import {Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const Footer = () =>{
    return(
        <div id='footer_div'>
            <Link to = '/'>
                <Header class='ui left alligned icon header'>
                    <i class='ticket alternate'></i>
                    <div class='content'>FlatTicket</div>
                </Header>
            </Link>

        </div>
    )
}

export default Footer