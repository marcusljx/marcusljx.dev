import React from 'react';
import { Mail, MapPin, Globe } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
  contact: {
    based_in: string;
    nationality: string;
    email: string;
  };
}

const Hero: React.FC<HeroProps> = ({ name, title, contact }) => {
  return (
    <section className="fade-up" style={{ paddingTop: '6rem', paddingBottom: '4rem', textAlign: 'center' }}>
      <div className="hero-content">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 700 }}>
          {name}
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', marginBottom: '2rem', fontWeight: 500 }}>
          {title}
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={18} color="var(--primary-blue)" />
            <span>{contact.based_in}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="var(--primary-blue)" />
            <span>{contact.nationality}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={18} color="var(--primary-blue)" />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
