import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const skills = ["Python", "SQL", "JavaScript", "React", "HTML", "CSS", "Power BI"];
  const projects = [
    { title: "Employee Management & HR Analytics", detail: "Analyzed employee data with SQL and created an interactive Power BI dashboard." },
    { title: "FinanceFlow AI", detail: "A finance management application concept using React, Node.js and MongoDB." }
  ];
  return <><header><a className="logo" href="#home">Priyanshi.</a><nav><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></header>
    <main>
      <section className="hero" id="home"><p className="eyebrow">MCA STUDENT • ASPIRING DEVELOPER</p><h1>Hello, I'm <span>Priyanshi Bindal</span></h1><p>I enjoy building useful applications, solving problems and learning modern technologies.</p><a className="btn" href="#projects">View my work</a></section>
      <section id="about"><h2>About Me</h2><p>I am pursuing MCA and have a BCA background with an interest in software development, data and AI. I have internship experience in Python development and API integration.</p></section>
      <section id="skills"><h2>Technical Skills</h2><div className="chips">{skills.map(s=><span key={s}>{s}</span>)}</div></section>
      <section id="projects"><h2>Projects</h2><div className="cards">{projects.map(p=><article className="card" key={p.title}><h3>{p.title}</h3><p>{p.detail}</p></article>)}</div></section>
      <section id="contact"><h2>Contact</h2><p>Let's connect and build something meaningful.</p><a href="mailto:your-email@example.com">your-email@example.com</a><p><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a> · <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a></p></section>
    </main><footer>© {new Date().getFullYear()} Priyanshi Bindal. Built with React.</footer></>;
}
createRoot(document.getElementById("root")).render(<App />);