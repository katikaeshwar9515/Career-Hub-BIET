import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs-page">
      <div className="container">
        <h1 className="page-title">ALL AVAILABLE JOBS</h1>
        <div className="job-cards">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div className="job-card" key={element._id}>
                <h2 className="job-title">{element.title}</h2>
                <p className="job-info">{element.category}</p>
                <p className="job-info">{element.country}</p>
                <Link to={`/job/${element._id}`} className="job-details-link">
                  View Details
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
