import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>AI Interview Pro</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#111",
    color: "#fff"
  }
};

export default Navbar;