import React, { useEffect, useState } from 'react';
import { Briefcase, Trophy, GraduationCap, Code, UserCheck, ArrowUp } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'awards', label: 'Awards', icon: Trophy },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'referees', label: 'Referees', icon: UserCheck },
];

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showTop, setShowTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowTop(scrollY > 250);

      const sectionIds = ['experience', 'awards', 'education', 'skills', 'referees'];
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when top of section has reached near sticky top and bottom is still visible
          if (rect.top <= 140 && rect.bottom >= 80) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="floating-nav" aria-label="Section navigation">
      {showTop && (
        <>
          <button
            type="button"
            className="floating-nav-item top-btn"
            onClick={() => scrollToSection('top')}
            aria-label="Scroll to top"
            data-tooltip="Top"
          >
            <ArrowUp size={16} />
            <span className="nav-label">Top</span>
          </button>
          <div className="floating-nav-divider" />
        </>
      )}

      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`floating-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
            aria-label={`Scroll to ${item.label}`}
            data-tooltip={item.label}
          >
            <Icon size={18} />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default FloatingNav;
