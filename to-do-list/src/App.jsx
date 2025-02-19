import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [job, setJob] = useState("");

  const [jobs, setJobs] = useState(() => {
    const listJobs = JSON.parse(localStorage.getItem("Jobs"));
    return listJobs ?? [];
  });

  const handleSave = () => {
    setJobs((prev) => {
      const newJob = [...prev, job];
      localStorage.setItem("Jobs", JSON.stringify(newJob));
      return newJob;
    });
    setJob("");
  };

  const handleDelete = (index) => {
    setJobs((prev) => {
      const newJobs = prev.filter((_, i) => i !== index);
      localStorage.setItem("Jobs", JSON.stringify(newJobs));
      return newJobs;
    });
  };

  const handleComplete = (index) => {
    setJobs((prev) => {
      const newJobs = prev.map((job, i) => {
        if (i === index) {
          return { ...job, status: "Completed" };
        }
        return job;
      });
      localStorage.setItem("Jobs", JSON.stringify(newJobs));
      return newJobs;
    });
  };

  return (
    <div className="app-container d-flex align-items-center justify-content-center flex-column">
      <h3>Todo App</h3>
      <div className="d-flex align-items-center mb-3 navbar">
        <div className="form-group mb-0">
          <input
            type="text"
            placeholder="Enter a task here"
            className="form-control"
            value={job.name}
            onChange={(e) =>
              setJob({ name: e.target.value, status: "In progess" })
            }
          />
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="table-wrapper">
        <table className="table table-hover table-bordered text-center">
          <thead>
            <tr>
              <th>No.</th>
              <th>Todo item</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={index}
                className={
                  job.status === "Completed" ? "table-success" : "table-light"
                }
              >
                <td>{index + 1}</td>
                <td
                  className={job.status === "Completed" ? "complete" : "task"}
                >
                  {job.name}
                </td>
                <td>{job.status}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleComplete(index)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
