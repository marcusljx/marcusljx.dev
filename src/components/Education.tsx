import React from 'react';
import { GraduationCap } from 'lucide-react';

interface EducationItem {
    institution: string;
    degree?: string;
    program?: string;
    years?: string;
    year?: string;
    details: any[];
}

interface EducationProps {
    education: EducationItem[];
}

const Education: React.FC<EducationProps> = ({ education }) => {
    return (
        <section className="fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <GraduationCap size={28} color="var(--primary-blue)" />
                <h2 style={{ margin: 0 }}>Education</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {education.map((edu, index) => (
                    <div key={index} className="card fade-up">
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{edu.institution}</h3>
                        {edu.degree && <h4 style={{ fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 500, marginBottom: '0.25rem' }}>{edu.degree}</h4>}
                        {edu.program && <h4 style={{ fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 500, marginBottom: '0.25rem' }}>{edu.program}</h4>}

                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                            {edu.years || edu.year}
                        </p>

                        <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            {edu.details && edu.details.map((detail, idx) => {
                                const key = Object.keys(detail)[0];
                                const value = detail[key];

                                if (Array.isArray(value)) {
                                    return (
                                        <li key={idx} style={{ marginBottom: '0.5rem' }}>
                                            <strong style={{ textTransform: 'capitalize' }}>{key}:</strong>
                                            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem' }}>
                                                {value.map((v, i) => <li key={i} style={{ listStyleType: 'circle' }}>{v}</li>)}
                                            </ul>
                                        </li>
                                    )
                                }

                                return (
                                    <li key={idx} style={{ marginBottom: '0.5rem' }}>
                                        <strong style={{ textTransform: 'capitalize' }}>{key}:</strong> {value}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
