import React from 'react';
import { Award, Code, Users } from 'lucide-react';

interface SkillsProps {
    skills: any;
    leadership: string[];
    interests: any;
}

const Skills: React.FC<SkillsProps> = ({ skills, leadership, interests }) => {
    return (
        <section className="fade-up">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>

                {/* Technical Skills */}
                <div className="fade-up card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Code size={24} color="var(--primary-blue)" />
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Technical Skills</h3>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Languages & Frameworks</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {skills.programming_languages_frameworks.map((skill: string, idx: number) => (
                                <span key={idx} className="pill" style={{ backgroundColor: '#F3F4F6' }}>{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Tools</h4>
                        {Object.entries(skills.other_tools).map(([category, tools]: [string, any], idx) => (
                            <div key={idx} style={{ marginBottom: '0.75rem' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                                    {category.replace('_', ' ')}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                    {tools.map((t: string, i: number) => <span key={i} className="pill" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>{t}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leadership */}
                <div className="fade-up card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Users size={24} color="var(--primary-blue)" />
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Leadership</h3>
                    </div>

                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                        {leadership.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '0.75rem', listStyleType: 'square' }}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Interests */}
                <div className="fade-up card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Award size={24} color="var(--primary-blue)" />
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Interests & Languages</h3>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Languages</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {interests.languages.map((lang: string, idx: number) => (
                                <span key={idx} className="pill" style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}>{lang}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Taekwondo</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>{interests.taekwondo}</p>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Orchestral Performance</h4>
                        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                            {interests.orchestral_performance.map((inst: string, idx: number) => (
                                <li key={idx} style={{ listStyleType: 'circle' }}>{inst}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Skills;
