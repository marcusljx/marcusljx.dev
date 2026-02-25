import { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Referees from './components/Referees';

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/resume.yml')
      .then(response => response.text())
      .then(text => {
        const parsed = yaml.load(text);
        setData(parsed);
      })
      .catch(error => console.error("Error loading YAML:", error));
  }, []);

  useEffect(() => {
    // Intersection Observer for fade-up animations
    if (!data) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: Unobserve after animating once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Give React a tick to render DOM
    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-up');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [data]);

  if (!data) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--primary-blue)', fontSize: '1.2rem', fontWeight: 500 }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container fade-up">
      <Hero
        name={data.name}
        title={data.title}
        contact={data.contact}
      />
      <Experience history={data.employment_history} />
      <Education education={data.education} />
      <Skills
        skills={data.software_engineering_skills}
        leadership={data.leadership_positions}
        interests={data.interests_other_skills}
      />
      <Referees referees={data.referees} />
    </div>
  );
}

export default App;
