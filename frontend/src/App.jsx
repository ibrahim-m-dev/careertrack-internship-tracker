import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/applications";

function App() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    location: "",
    deadline: "",
    notes: ""
  });

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      alert("Could not connect to backend. Make sure Spring Boot is running.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function addApplication(event) {
    event.preventDefault();

    if (!form.company || !form.role) {
      alert("Please enter at least company and role.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const newApplication = await response.json();
      setApplications([...applications, newApplication]);

      setForm({
        company: "",
        role: "",
        status: "Applied",
        location: "",
        deadline: "",
        notes: ""
      });
    } catch (error) {
      console.error("Failed to add application:", error);
      alert("Could not add application.");
    }
  }

  async function deleteApplication(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      setApplications(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Failed to delete application:", error);
      alert("Could not delete application.");
    }
  }

  async function updateStatus(id, newStatus) {
    const selectedApplication = applications.find((app) => app.id === id);

    if (!selectedApplication) return;

    const updatedApplication = {
      ...selectedApplication,
      status: newStatus
    };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedApplication)
      });

      const savedApplication = await response.json();

      setApplications(
        applications.map((app) =>
          app.id === id ? savedApplication : app
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Could not update status.");
    }
  }

  const filteredApplications = applications
    .filter((app) => filter === "All" || app.status === filter)
    .filter((app) =>
      `${app.company} ${app.role} ${app.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const total = applications.length;
  const applied = applications.filter((app) => app.status === "Applied").length;
  const assessments = applications.filter(
    (app) => app.status === "Assessment"
  ).length;
  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const offers = applications.filter((app) => app.status === "Offer").length;

  return (
    <main className="app">
      <section className="hero">
        <p className="label">CareerTrack</p>
        <h1>Internship Application Tracker</h1>
        <p className="subtitle">
          A full-stack project dashboard for tracking internship applications,
          deadlines, assessments, interview stages, and notes.
        </p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <span>Total</span>
          <strong>{total}</strong>
        </div>

        <div className="stat-card">
          <span>Applied</span>
          <strong>{applied}</strong>
        </div>

        <div className="stat-card">
          <span>Assessments</span>
          <strong>{assessments}</strong>
        </div>

        <div className="stat-card">
          <span>Interviews</span>
          <strong>{interviews}</strong>
        </div>

        <div className="stat-card">
          <span>Offers</span>
          <strong>{offers}</strong>
        </div>
      </section>

      <section className="content">
        <form className="form-card" onSubmit={addApplication}>
          <h2>Add New Application</h2>

          <input
            name="company"
            placeholder="Company name"
            value={form.company}
            onChange={handleChange}
          />

          <input
            name="role"
            placeholder="Role title"
            value={form.role}
            onChange={handleChange}
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Assessment</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />

          <button type="submit">Add Application</button>
        </form>

        <section className="list-card">
          <div className="list-header">
            <h2>Applications</h2>

            <input
              className="search"
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              <option>Applied</option>
              <option>Assessment</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Offer</option>
            </select>
          </div>

          <div className="applications">
            {loading && <p className="empty">Loading applications...</p>}

            {!loading && filteredApplications.length === 0 && (
              <p className="empty">No applications found.</p>
            )}

            {filteredApplications.map((app) => (
              <article className="application-card" key={app.id}>
                <div className="card-top">
                  <div>
                    <h3>{app.company}</h3>
                    <p>{app.role}</p>
                    <small>{app.location}</small>
                  </div>

                  <select
                    className={`status-select ${app.status.toLowerCase()}`}
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                  >
                    <option>Applied</option>
                    <option>Assessment</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                    <option>Offer</option>
                  </select>
                </div>

                <div className="application-meta">
                  {app.deadline && <small>Deadline: {app.deadline}</small>}
                </div>

                {app.notes && <p className="notes">{app.notes}</p>}

                <button
                  className="delete"
                  onClick={() => deleteApplication(app.id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;