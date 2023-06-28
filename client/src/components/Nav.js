import React from "react";
import { Input, Menu, Header, Button, Dropdown } from "semantic-ui-react";

const Nav = ({ search, handleSearchChange }) => {
  return (
    <Menu id="nav" className="middle aligned">  
      <Menu.Menu position="left">
        <Menu.Item>
          <Header as='h2' icon='ticket alternate' content='FlatTicket'/>
        </Menu.Item>
        <Menu.Item name="home" />
      </Menu.Menu>
      <Menu.Menu position="right">
        <Dropdown item text="Search by">
          <Dropdown.Menu>
            <Dropdown.Item>Venue</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item>
          <Input
            icon="search"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={search}
          ></Input>
        </Menu.Item>
        <Menu.Item>
          <Button primary>Login</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;
