import React from 'react';
import { Trophy } from 'lucide-react';

export interface AwardItem {
  title: string;
  issuer: string;
  date: string;
  associated_with?: string;
  description?: string;
}

interface AwardsProps {
  awards: AwardItem[];
}

const Awards: React.FC<AwardsProps> = ({ awards }) => {
  if (!awards || awards.length === 0) return null;

  return (
    <section id="awards" className="resume-section">
      <div className="section-header-sticky">
        <div className="section-header-inner">
          <Trophy size={28} color="var(--primary-blue)" />
          <h2 className="section-title">Awards</h2>
        </div>
      </div>

      <div className="section-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {awards.map((award, index) => (
          <div key={index} className="card fade-up">
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {award.title}
            </h3>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
              Issued by {award.issuer} {award.date ? `· ${award.date}` : ''}
            </div>
            {award.associated_with && (
              <div style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 500, marginBottom: '0.75rem' }}>
                Associated with {award.associated_with}
              </div>
            )}
            {award.description && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {award.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
