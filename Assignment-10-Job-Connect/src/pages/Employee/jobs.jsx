import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../../features/jobSlice';
import axios from 'axios';
import './Jobs.css';

const Jobs = () => {
    const jobs = useSelector((state) => state.job.jobs); 
    console.log("Jobs in Redux:", jobs); 
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:3010/user/get/jobs")
            .then((res) => {
                console.log("Jobs fetched:", res.data);
                dispatch(setJobs(res.data)); 
            })
            .catch((err) => console.error("Error fetching jobs:", err));
    }, [dispatch]);

    return (
        <div className="jobs-container">
            <h1>Available Jobs</h1>
            <ul>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <li key={job._id}>
                            <h3>{job.jobTitle} at {job.companyName}</h3>
                            <p>{job.description}</p>
                            <p>Salary: ${job.salary}</p>
                        </li>
                    ))
                ) : (
                    <p>No jobs available.</p>
                )}
            </ul>
        </div>
    );
};

export default Jobs;