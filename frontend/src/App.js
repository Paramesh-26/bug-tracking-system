import { useEffect, useState } from "react";
import api from "./api";
import Login from "./components/Login";
import BugForm from "./components/BugForm";
import BugList from "./components/BugList";

function App() {
  const [user, setUser] = useState(null); // { userId, username, role }
  const [bugs, setBugs] = useState([]);

  const fetchBugs = async () => {
    const res = await api.get("/");
    setBugs(res.data);
  };

  useEffect(() => {
    if (user) fetchBugs();
  }, [user]);

  // 🔐 LOGIN SCREEN
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>🐞 Bug Tracking System</h2>
        <div>
          <span style={styles.user}>
            {user.username} ({user.userId}) – {user.role}
          </span>
          <button style={styles.logout} onClick={() => setUser(null)}>
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={styles.container}>
        {user.role === "tester" && (
          <>
            <BugForm fetchBugs={fetchBugs} user={user} />
            <BugList bugs={bugs} fetchBugs={fetchBugs} readOnly />
          </>
        )}

        {user.role === "developer" && (
          <BugList bugs={bugs} fetchBugs={fetchBugs} />
        )}
      </div>
    </div>
  );
}

export default App;

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb"
  },
  header: {
    background: "#667eea",
    color: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  user: {
    marginRight: "15px",
    fontWeight: "bold"
  },
  logout: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  container: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "auto"
  }
};