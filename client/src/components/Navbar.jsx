import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "20px 40px", background: "#0f172a" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ color: "#8b5cf6" }}>AI Interview Pro</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/quiz" style={{ color: "white", textDecoration: "none" }}>Quiz</Link>
          <Link to="/report" style={{ color: "white", textDecoration: "none" }}>Report</Link>
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;