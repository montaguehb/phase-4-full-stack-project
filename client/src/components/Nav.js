import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Input, Menu, Header, Button, Dropdown } from "semantic-ui-react";
import Logout from "./Logout"

const Nav = ({ search, handleSearchChange, sortBy, handleSortBy, login, updateLogin, user}) => {

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
    <Menu id="nav" className="middle aligned">
      <Menu.Menu position="left">
        <Menu.Item>
          <Link to="/concerts">
            <Header as="h2" icon="ticket alternate" content="FlatTicket" />
          </Link>
        </Menu.Item>
        <Link to="/concerts">
          <Menu.Item name="home" />
        </Link>
      </Menu.Menu>
      <Menu.Item position="right">
        <h2>The number one Place For Concert Tickets!</h2>
      </Menu.Item>
      <Menu.Menu position="right">
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
        <Menu.Item>
          {login ? (
            <Link to="/profile">
              <Button primary>Profile</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button primary>Login</Button>
            </Link>
          )}
        </Menu.Item>
        {login?<Menu.Item><Logout updateLogin={updateLogin}/></Menu.Item>:<></>}
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;
