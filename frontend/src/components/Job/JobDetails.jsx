import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="job-details page">
      <div className="container">
        <h2 className="page-title">Job Details</h2>
        <div className="job-details-container">
          <div className="job-details-info">
            <div className="job-info">
              <span className="info-label">Title:</span>
              <span className="info-value">{job.title}</span>
            </div>
            <div className="job-info">
              <span className="info-label">Category:</span>
              <span className="info-value">{job.category}</span>
            </div>
            <div className="job-info">
              <span className="info-label">Country:</span>
              <span className="info-value">{job.country}</span>
            </div>
            <div className="job-info">
              <span className="info-label">City:</span>
              <span className="info-value">{job.city}</span>
            </div>
            <div className="job-info">
              <span className="info-label">Location:</span>
              <span className="info-value">{job.location}</span>
            </div>
            <div className="job-info">
              <span className="info-label">Description:</span>
              <span className="info-value">{job.description}</span>
            </div>
            <div className="job-info">
              <span className="info-label">Job Posted On:</span>
              <span className="info-value">{job.jobPostedOn}</span>
            </div>
            <div className="job-info">
              <span className="info-label">Salary:</span>
              {job.fixedSalary ? (
                <span className="info-value">{job.fixedSalary}</span>
              ) : (
                <span className="info-value">
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </div>
          </div>
          {user && user.role !== "Employer" && (
            <Link to={`/application/${job._id}`} className="apply-btn">
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
