import React from 'react';
import { UserCheck, Mail, ExternalLink } from 'lucide-react';

interface RefereeItem {
    name: string;
    company: string;
    position: string;
    contact: string;
    profile?: string;
}

interface RefereesProps {
    referees: RefereeItem[];
}

const Referees: React.FC<RefereesProps> = ({ referees }) => {
    return (
        <section className="fade-up" style={{ paddingBottom: '6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <UserCheck size={28} color="var(--primary-blue)" />
                <h2 style={{ margin: 0 }}>Referees</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {referees.map((ref, index) => (
                    <div key={index} className="card fade-up">
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{ref.name}</h3>
                        <h4 style={{ fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 500, marginBottom: '0.1rem' }}>{ref.position}</h4>
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{ref.company}</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={16} color="var(--text-tertiary)" />
                                <a href={`mailto:${ref.contact}`} style={{ color: 'var(--text-secondary)' }}>{ref.contact}</a>
                            </div>

                            {ref.profile && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ExternalLink size={16} color="var(--text-tertiary)" />
                                    <a href={`https://${ref.profile}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                                        {ref.profile}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Referees;
