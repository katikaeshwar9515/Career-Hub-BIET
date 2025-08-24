import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="my-jobs-page">
      <div className="container">
        <h1>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="job-cards">
            {myJobs.map((element) => (
              <div className="job-card" key={element._id}>
                <div className="card-content">
                  <div className="short-fields">
                    <div>
                      <span>Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                      />
                    </div>
                    {/* Short fields */}
                    {/* Add other short fields similarly */}
                  </div>
                  <div className="long-fields">
                    {/* Long fields */}
                    <div>
                      <span>Description:</span>{" "}
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    {/* Add other long fields similarly */}
                  </div>
                </div>
                <div className="button-wrapper">
                  <div className="edit-btn-wrapper">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="check-btn"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="cross-btn"
                        >
                          <RiCloseLine />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You've not posted any jobs or may have deleted all of your jobs!</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
