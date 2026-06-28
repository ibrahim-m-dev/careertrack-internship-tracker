import { useEffect, useState } from "react";
import "./App.css";

const initialApplications = [
  {
    id: 1,
    company: "IBM",
    role: "Software Engineering Intern",
    status: "Assessment",
    location: "Bucharest / Hybrid",
    deadline: "2026-07-05",
    notes: "Coding assessment received"
  },
  {
    id: 2,
    company: "Siemens Energy",
    role: "Working Student - IT Specialist",
    status: "Applied",
    location: "Bucharest",
    deadline: "2026-07-10",
    notes: "Resume and cover letter submitted"
  }
];

function App() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("careertrack-applications");
    return saved ? JSON.parse(saved) : initialApplications;
  });

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

  useEffect(() => {
    localStorage.setItem(
      "careertrack-applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function addApplication(event) {
    event.preventDefault();

    if (!form.company || !form.role) {
      alert("Please enter at least company and role.");
      return;
    }

    const newApplication = {
      id: Date.now(),
      ...form
    };

    setApplications([newApplication, ...applications]);

    setForm({
      company: "",
      role: "",
      status: "Applied",
      location: "",
      deadline: "",
      notes: ""
    });
  }

  function deleteApplication(id) {
    setApplications(applications.filter((app) => app.id !== id));
  }

  function updateStatus(id, newStatus) {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
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
            {filteredApplications.length === 0 && (
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