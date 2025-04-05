import React from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

const Home = ({ setUser }) => {
  return (
    <div className="container">
      <Navbar setUser={setUser}/>
      <Card
        header={"Welcome to CareerNest"}
        cardContent={
          "At CareerNest, we bridge ambitions with opportunities. Our job portal is dedicated to connecting exceptional talents with pioneering companies. As a leading career hub, we pride ourselves on curating a vast selection of job listings across industries, empowering professionals to soar to new heights in the ever-evolving job market. Dive into a world where your next career adventure awaits, and let us help you land your dream job in the digital age."
        }
        
      />
    </div>
  );
};

export default Home;
