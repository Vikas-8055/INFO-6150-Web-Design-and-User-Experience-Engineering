import React from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

const Contact = ({ setUser }) => {
  return (
    <div className="container">
      <Navbar setUser={setUser} />
      <Card
        header={"Reach Out to CareerNest"}
        cardContent="
        For further information or support
        contact us at:
        Email: support@careernest.com
        Phone: 123-456-7890
        "
      />
    </div>
  );
};

export default Contact;
