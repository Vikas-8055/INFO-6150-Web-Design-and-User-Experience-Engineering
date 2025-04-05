import React from "react";
import Card from "../../components/Card";
import "./home.css";

const Home = ({ setUser }) => {
  return (
    <div className="home_container">
      <div className="home_content">
        <Card
          header={"Welcome to CareerPrep"}
          cardContent={
            "At CareerPrep, we bridge ambitions with opportunities. Our job portal connects exceptional talents with pioneering companies. Explore a curated selection of job listings across industries and let us help you land your dream job in the digital age."
          }
        />
      </div>
    </div>
  );
};

export default Home;
