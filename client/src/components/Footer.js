import React from "react";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Link to="/">
        <Header
          as="h2"
          icon="ticket alternate"
          content="FlatTicket"
          className="ui inverted vertical footer segment form-page"
        />
      </Link>
    </div>
  );
};

export default Footer;
