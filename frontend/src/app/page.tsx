"use client";
import Image from "next/image";

export default function Home() {
  const sendLog = async () => {
    await fetch("https://localhost:5008/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: "Dea", description: "Visited homepage" }),
    });
    alert("Log sent!");
  };

  return (
    <main
      style={{
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: "black",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#e0f7fa", // light medical teal
          color: "#004d66",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span role="img" aria-label="logo">🏥</span> HospitalMS
        </h2>
        <div>
          <a
            href="/"
            style={{
              color: "#004d66",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            Home
          </a>
          <a
            href="/patients"
            style={{
              color: "#004d66",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            Patients
          </a>
          <a
            href="/about"
            style={{
              color: "#004d66",
              textDecoration: "none",
            }}
          >
            Read our docs
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          flex: 1,
          backgroundImage: "url('/images/image1.jpg')", // change image path if needed
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "600px",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            TREAT <span style={{ color: "#00c2a4" }}>HEART</span> DISEASE.
          </h1>
          <p style={{ fontSize: "1.1rem", margin: "1rem 0" }}>
            Consectetur adipisicing elit. Eligendi vel ipsam deleniti dignissimos
            corporis consequatur possimus eaque voluptates.
          </p>
          <div>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#fff",
                color: "#333",
                border: "none",
                borderRadius: "6px",
                marginRight: "1rem",
                cursor: "pointer",
              }}
            >
              READ MORE
            </button>
            <button
              onClick={sendLog}
              style={{
                padding: "0.8rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#00c2a4",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              DONATE NOW
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          padding: "2rem",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <p style={{ margin: "0" }}>
          © {new Date().getFullYear()} HospitalMS. All rights reserved.
        </p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          Kontakt:{" "}
          <a
            href="mailto:info@hospitalms.com"
            style={{ color: "#00c2a4", textDecoration: "none" }}
          >
            info@hospitalms.com
          </a>{" "}
          | +383 (0) 49 123 456
        </p>
      </footer>
    </main>
  );
}
