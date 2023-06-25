import React from 'react';
import {Header as SemanticHeader} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const Header = () =>{
    return(
        <div id='header_div'>
            <Link to = '/'>
                <SemanticHeader id='title'>FlatTicket</SemanticHeader>
            </Link>
            {/* insert header items here (nav bar, logo,search,sign in(?)) */}
        </div>
    )
}

export default Header