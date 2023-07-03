import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Input, Menu, Header, Button, Dropdown, Icon } from "semantic-ui-react";
import Logout from "./Logout"

const Nav = ({ search, handleSearchChange, sortBy, handleSortBy, user, updateUser}) => {

  const options = [
    {
      key: "name",
      text: "Name",
      value: "name",
      content: "Name",
    },
    {
      key: "venue",
      text: "Venue",
      value: "venue",
      content: "Venue",
    },
    {
      key: "artist",
      text: "Artist",
      value: "artist",
      content: "Artist",
    },
  ];
  return (
    <Menu id="nav" className="ui inverted middle aligned" borderless inline>
      <Menu.Menu position="left">

        <Menu.Item>
          <Link to="/concerts">
            <Header as="h2" ><Icon name='ticket alternate'></Icon>FlatTicket</Header>
          </Link>
        </Menu.Item>
      <Menu.Item >
        <h2>The Place To Go For Concert Tickets!</h2>
      </Menu.Item>
      <Menu.Item position="right">
        <Dropdown
          selection
          value={sortBy}
          onChange={handleSortBy}
          placeholder="Search by"
          options={options}
        ></Dropdown>

        <Menu.Item>
          <Input
            icon="search"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={search}
          ></Input>
        </Menu.Item>
        
        <Link to="/concerts" >
          <Menu.Item name="home" >
            <Button icon='home'></Button>
          </Menu.Item>
        </Link>

        <Menu.Item position="right">
          {user ? (
            <Link to="/profile" position='right'>
              <Button primary>Profile</Button>
            </Link>
          ) : (
            <Link to="/login" position = 'right'>
              <Button primary>Login</Button>
            </Link>
          )}
        </Menu.Item>
        {user?<Menu.Item><Logout updateUser={updateUser}/></Menu.Item>:<></>}
      </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;
