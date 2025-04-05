import React from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import "./about.css";

const About = ({ setUser }) => {
  return (
    <div className="container">
      <Navbar setUser={setUser} />
      <Card
        header={"About CareerNest"}
        cardContent={
          "Nestled at the intersection of aspiration and achievement, CareerNest stands as a beacon for job seekers and employers alike. We are not just a job portal; we are architects of opportunity and sculptors of talent. Our mission is to facilitate a dynamic space where career paths are forged, and professional dreams are realized. With a deep understanding of the ever-changing job market, CareerNest harnesses the power of technology to bring together innovative companies and visionary individuals. We specialize in curating a diverse array of job opportunities that span industries, roles, and geographies. At CareerNest, we believe in the potential of every individual to make an impact. Our comprehensive platform is designed to provide an intuitive and seamless job search experience, offering tailored resources that guide job seekers towards their goals. For employers, we offer a suite of tools to discover and engage with candidates who are not just qualified, but are the perfect fit for their company culture and values. Join us at CareerNest, where your next career chapter unfolds, and the future of work is shaped with purpose, passion, and precision."
        }
      />
    </div>
  );
};

export default About;
