import { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Education from './components/Education';
import Skills from './components/Skills';
import Referees from './components/Referees';
import FloatingNav from './components/FloatingNav';
import DownloadPdfButton from './components/DownloadPdfButton';

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/resume.yml')
      .then(response => response.text())
      .then(text => {
        const parsed = yaml.load(text) as any;
        setData(parsed);
        if (parsed && parsed.name) {
          document.title = parsed.name;
        }
      })
      .catch(error => console.error("Error loading YAML:", error));
  }, []);

  useEffect(() => {
    if (!data) return;

    // Observer for section underline animation when entering view
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const title = entry.target.querySelector('.section-title');
          if (entry.isIntersecting) {
            title?.classList.add('is-visible');
          } else {
            title?.classList.remove('is-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    // Observer for fade-up animations on cards and content
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    // Give React a tick to render DOM
    const timer = setTimeout(() => {
      const headers = document.querySelectorAll('.section-header-sticky');
      headers.forEach(h => headerObserver.observe(h));

      const elements = document.querySelectorAll('.fade-up');
      elements.forEach(el => fadeObserver.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      headerObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, [data]);

  if (!data) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--primary-blue)', fontSize: '1.2rem', fontWeight: 500 }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <FloatingNav />
      <DownloadPdfButton />
      <Hero
        name={data.name}
        title={data.title}
        contact={data.contact}
      />
      <Experience history={data.employment_history} />
      <Awards awards={data.awards} />
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
