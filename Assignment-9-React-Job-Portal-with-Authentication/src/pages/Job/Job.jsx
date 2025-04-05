import React from "react";
import Card from "../../components/Card"; 
import Navbar from "../../components/Navbar"; 
import "./job.css"; 

const Job = ({ setUser }) => {
  const jobs = [
    {
      id: 1,
      title: "DevOps Engineer",
      description: "DevOps engineers focus on the intersection of software development and IT operations...",
      lastUpdated: "Last updated 2 days ago",
      applyLink: "https://example.com/apply/devops-engineer",
      applyNow: "Apply Now"
    },
    
    {
      id: 2,
      title: 'UX/UI Designer',
      description: 'Shape engaging user experiences and create visually captivating designs. Work alongside cross-functional teams to turn ideas into reality.',
      lastUpdated: 'Last updated 4 hours ago',
      applyLink: 'https://example.com/apply/ux-ui-designer',
      applyNow: "Apply Now"
    },
    {
      id: 3,
      title: 'Data Scientist',
      description: 'Leverage advanced analytics and machine learning to uncover insights from vast data sets. Proficiency with Python and R is a must.',
      lastUpdated: 'Last updated 3 days ago',
      applyLink: 'https://example.com/apply/data-scientist',
      applyNow: "Apply Now"
    },
    {
      id: 4,
      title: 'Customer Support Representative',
      description: 'Deliver unparalleled customer service and support. Exceptional communication skills and a knack for solving problems are key.',
      lastUpdated: 'Last updated 6 hours ago',
      applyLink: 'https://example.com/apply/customer-support-representative',
      applyNow: "Apply Now"
    },
  ];

  return (
    <div className="scrollable-container">
      <div className="container">
        <Navbar setUser={setUser} />
        <div className="jobs_container">
          {jobs.map((job) => (
            <Card
              key={job.id}
              title={job.title}
              cardContent={job.description}
              lastUpdated={job.lastUpdated}
              applyLink={job.applyLink}
              applyNow={job.applyNow}
            />
          ))}
        </div>
      </div>
    </div>

    
  );
};

export default Job;
