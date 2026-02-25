import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
    company: string;
    position: string;
    dates: string;
    responsibilities: string[];
    technologies: string[];
}

interface ExperienceProps {
    history: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ history }) => {
    return (
        <section className="fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Briefcase size={28} color="var(--primary-blue)" />
                <h2 style={{ margin: 0 }}>Experience</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {history.map((job, index) => (
                    <div key={index} className="card fade-up" style={{ borderLeft: '4px solid var(--primary-blue)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '1rem', gap: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{job.position}</h3>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-blue)', fontWeight: 500 }}>{job.company}</h4>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                                <Calendar size={16} />
                                <span>{job.dates}</span>
                            </div>
                        </div>

                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                            {job.responsibilities.map((resp, idx) => (
                                <li key={idx} style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>{resp}</li>
                            ))}
                        </ul>

                        {job.technologies && job.technologies.length > 0 && (
                            <div>
                                <h5 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Technologies</h5>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {job.technologies.map((tech, idx) => (
                                        <span key={idx} className="pill">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
