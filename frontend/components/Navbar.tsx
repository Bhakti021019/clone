import React, { useState } from "react";

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <header style={styles.navbar}>
      <div style={styles["navbar-container"]}>
        {/* Logo + Text */}
        <div style={styles["navbar-logo"]}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREpikUNrGgi8v1kLJosoYsGir8n5BXNaVO4g&s"
            alt="Gov Logo"
            style={styles["navbar-logo-img"]}
          />
          <div>
            <h1 style={styles["navbar-title"]}>
              Ministry of Micro, Small & Medium Enterprises
            </h1>
            <p style={styles["navbar-subtitle"]}>
              सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय
            </p>
          </div>
        </div>

        {/* Menu Links */}
        <nav style={styles["navbar-links"]}>
          {[
            { id: "home", text: "Home", active: true },
            { id: "nicCode", text: "NIC Code" },
            { id: "documents", text: "Useful Documents" },
            { id: "verify", text: "Print / Verify" },
            { id: "update", text: "Update Details" },
            { id: "login", text: "Login" },
          ].map((link) => (
            <a
              key={link.id}
              href="#"
              style={
                hoveredLink === link.id
                  ? { ...styles.link, ...styles.linkHover }
                  : link.active
                  ? styles.active
                  : styles.link
              }
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Inline styles
const styles = {
  navbar: {
    backgroundColor: "#4B0082", // Indigo purple
    color: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "0.75rem 1rem",
  },
  "navbar-container": {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "navbar-logo": {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  "navbar-logo-img": {
    height: "48px",
    width: "auto",
  },
  "navbar-title": {
    fontSize: "1rem",
    fontWeight: "bold",
    lineHeight: "1.2",
  },
  "navbar-subtitle": {
    fontSize: "0.75rem",
    opacity: "0.9",
  },
  "navbar-links": {
    display: "flex",
    gap: "1.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  active: {
    color: "white",
    textDecoration: "none",
    paddingBottom: "0.25rem",
    borderBottom: "2px solid transparent",
    transition: "all 0.3s ease",
  },
  link: {
    color: "white",
    textDecoration: "none",
    paddingBottom: "0.25rem",
    borderBottom: "2px solid transparent",
    transition: "all 0.3s ease", // smooth grow + color change
  },
  linkHover: {
    borderBottomColor: "#60a5fa", // Light blue on hover
    transform: "scale(1.2)", // Grow effect
  },
};
