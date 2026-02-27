import api from "../api";

export default function BugList({ bugs, fetchBugs, readOnly = false }) {

  const updateStatus = async (id, status) => {
    await api.put(`/${id}`, { status });
    fetchBugs();
  };

  const deleteBug = async (id) => {
    await api.delete(`/${id}`);
    fetchBugs();
  };

  if (!bugs || bugs.length === 0) {
    return <p>No bugs found.</p>;
  }

  return (
    <div>
      {bugs.map((bug) => (
        <div key={bug._id} style={styles.card}>
          <p><b>Project:</b> {bug.projectName}</p>
          <p><b>Issue:</b> {bug.issueTitle}</p>
          <p><b>Description:</b> {bug.issueDescription}</p>
          <p>
            <b>Reported By:</b> {bug.reportedBy.name} ({bug.reportedBy.id})
          </p>
          <p><b>Priority:</b> {bug.priority}</p>

          <p>
            <b>Status:</b>{" "}
            {readOnly ? (
              <span style={styles.status}>{bug.status}</span>
            ) : (
              <select
                style={styles.select}
                value={bug.status}
                onChange={(e) => updateStatus(bug._id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            )}
          </p>

          {!readOnly && (
            <button
              style={styles.deleteBtn}
              onClick={() => deleteBug(bug._id)}
            >
              Delete Bug
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "18px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
  },
  select: {
    padding: "5px",
    borderRadius: "4px",
    marginLeft: "10px"
  },
  deleteBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  status: {
    fontWeight: "bold"
  }
};