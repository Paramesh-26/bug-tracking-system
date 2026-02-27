import { useState } from "react";
import api from "../api";

export default function BugForm({ fetchBugs, user }) {
  const [projectName, setProjectName] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const submitBug = async () => {
    if (!projectName || !issueTitle || !issueDescription) {
      alert("Please fill all fields");
      return;
    }

    await api.post("/", {
      projectName,
      issueTitle,
      issueDescription,
      priority,
      reportedBy: {
        id: user.userId,
        name: user.username
      }
    });

    setProjectName("");
    setIssueTitle("");
    setIssueDescription("");
    setPriority("Low");
    fetchBugs();
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>📝 Report a Bug</h3>

      <input
        style={styles.input}
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Issue Title"
        value={issueTitle}
        onChange={(e) => setIssueTitle(e.target.value)}
      />

      <textarea
        style={styles.textarea}
        placeholder="Describe the issue"
        value={issueDescription}
        onChange={(e) => setIssueDescription(e.target.value)}
      />

      <select
        style={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <button style={styles.button} onClick={submitBug}>
        Submit Bug
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    maxWidth: "600px",
    marginBottom: "30px"
  },
  heading: {
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "80px",
    marginBottom: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer"
  }
};