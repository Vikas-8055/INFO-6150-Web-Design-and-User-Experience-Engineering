import React from "react";
import Card from "../../components/Card";

const Contact = ({ setUser }) => {
  return (
    <div className="container">
      <Card
        header={"Reach Out to CareerPrep"}
        cardContent="
        For further information or support
        contact us at:
        Email: support@careerprep.com
        Phone: 890-567-1234
        "
      />
    </div>
  );
};

export default Contact;
