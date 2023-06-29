import React from "react";
import { Input, Menu, Header, Button, Dropdown } from "semantic-ui-react";

const Nav = ({ search, handleSearchChange, sortBy, handleSortBy }) => {
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
    }
  ];
  return (
    <Menu id="nav" className="middle aligned">
      <Menu.Menu position="left">
        <Menu.Item>
          <Header as="h2" icon="ticket alternate" content="FlatTicket" />
        </Menu.Item>
        <Menu.Item name="home" />
      </Menu.Menu>
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
          <Button primary>Login</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;
