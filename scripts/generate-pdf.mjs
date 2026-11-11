import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  try {
    const which = execSync('which google-chrome || which chromium || which chromium-browser', { encoding: 'utf8' }).trim();
    if (which && fs.existsSync(which)) return which;
  } catch (e) {}
  return 'google-chrome';
}

function formatCategoryTitle(category) {
  const titleMap = {
    cvs_tools: 'Version Control',
    version_control: 'Version Control',
    web_crawler_systems: 'Web Crawling',
    web_crawling: 'Web Crawling',
    document_processing_systems: 'Document Processing',
    document_processing: 'Document Processing',
    cloud_platforms: 'Cloud Platforms',
    cloud_infrastructure: 'Cloud Infrastructure',
    cloud: 'Cloud Platforms',
    ci_tools: 'CI / CD Tools',
    software_tools: 'Software & Project Tools',
  };
  if (titleMap[category.toLowerCase()]) {
    return titleMap[category.toLowerCase()];
  }
  return category
    .replace(/_systems?$/i, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function generatePrintHtml(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.name} - CV</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 8.75pt;
      line-height: 1.35;
      color: #1f2937;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    a {
      color: #2563eb;
      text-decoration: none;
    }

    /* Header */
    .header {
      border-bottom: 2px solid #5a7d9a;
      padding-bottom: 5px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .header-left h1 {
      font-size: 20pt;
      font-weight: 700;
      color: #111827;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .header-left .subtitle {
      font-size: 10pt;
      color: #5a7d9a;
      font-weight: 600;
      margin-top: 2px;
    }

    .header-contact {
      text-align: right;
      font-size: 8pt;
      color: #4b5563;
      line-height: 1.4;
    }

    /* Section Headings */
    .section {
      margin-bottom: 7px;
    }

    .section-title {
      font-size: 10pt;
      font-weight: 700;
      color: #1e3a5f;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1.2px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* Experience Items */
    .job-item {
      margin-bottom: 6px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }

    .job-title {
      font-size: 9.25pt;
      font-weight: 700;
      color: #111827;
    }

    .job-company {
      font-size: 8.75pt;
      font-weight: 600;
      color: #5a7d9a;
    }

    .job-dates {
      font-size: 8pt;
      color: #6b7280;
      font-weight: 500;
      white-space: nowrap;
    }

    .job-bullets {
      padding-left: 14px;
      margin: 2px 0;
    }

    .job-bullets li {
      font-size: 8.5pt;
      color: #374151;
      margin-bottom: 1.5px;
      line-height: 1.32;
    }

    .tech-stack {
      font-size: 7.75pt;
      color: #4b5563;
      margin-top: 2px;
    }

    .tech-stack strong {
      color: #1f2937;
      font-weight: 600;
    }

    /* Awards */
    .award-item {
      margin-bottom: 5px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .award-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .award-title {
      font-size: 9pt;
      font-weight: 700;
      color: #111827;
    }

    .award-meta {
      font-size: 8pt;
      color: #5a7d9a;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .award-desc {
      font-size: 8.25pt;
      color: #4b5563;
      line-height: 1.3;
    }

    /* Education */
    .edu-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }

    .edu-item {
      page-break-inside: avoid;
      break-inside: avoid;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 5px 7px;
    }

    .edu-inst {
      font-size: 8.75pt;
      font-weight: 700;
      color: #111827;
      line-height: 1.2;
    }

    .edu-degree {
      font-size: 8pt;
      color: #5a7d9a;
      font-weight: 600;
      margin-top: 1px;
    }

    .edu-year {
      font-size: 7.5pt;
      color: #6b7280;
      margin-bottom: 2px;
    }

    .edu-details {
      font-size: 7.75pt;
      color: #4b5563;
      line-height: 1.25;
    }

    /* Two Column Section */
    .two-column {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 12px;
    }

    /* Skills Box */
    .skill-category {
      margin-bottom: 4px;
    }

    .skill-cat-title {
      font-size: 8pt;
      font-weight: 700;
      color: #5a7d9a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-bottom: 1px;
    }

    .skill-pill-list {
      font-size: 8pt;
      color: #374151;
      line-height: 1.35;
    }

    /* Referees */
    .referee-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .referee-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 5px 7px;
      font-size: 8pt;
    }

    .ref-name {
      font-weight: 700;
      color: #111827;
      font-size: 8.5pt;
    }

    .ref-meta {
      color: #5a7d9a;
      font-weight: 500;
    }

    .ref-contact {
      color: #6b7280;
      font-size: 7.75pt;
      margin-top: 2px;
    }

    /* Page break helpers */
    .page-break {
      page-break-before: always;
      break-before: always;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <div class="header-left">
      <h1>${data.name}</h1>
      <div class="subtitle">Software Engineer · Staff / Lead Infrastructure & Systems</div>
    </div>
    <div class="header-contact">
      <div>📍 ${data.contact.based_in}</div>
      <div>🌐 Nationality: ${data.contact.nationality}</div>
      <div>✉️ <a href="mailto:${data.contact.email}">${data.contact.email}</a></div>
    </div>
  </div>

  <!-- Page 1: Professional Experience -->
  <div class="section">
    <div class="section-title">Professional Experience</div>
    ${data.employment_history.map(job => `
      <div class="job-item">
        <div class="job-header">
          <div>
            <span class="job-title">${job.position}</span>
            <span style="color:#9ca3af; margin: 0 4px;">·</span>
            <span class="job-company">${job.company}</span>
          </div>
          <span class="job-dates">${job.dates}</span>
        </div>
        <ul class="job-bullets">
          ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
        </ul>
        ${job.technologies && job.technologies.length > 0 && job.technologies[0] !== 'N.A.' ? `
          <div class="tech-stack">
            <strong>Key Tech:</strong> ${job.technologies.join(', ')}
          </div>
        ` : ''}
      </div>
    `).join('')}
  </div>

  <!-- Page 2: Awards, Education, Skills, Leadership & Referees -->
  <div class="page-break"></div>

  <!-- Header on Page 2 (Compact) -->
  <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #5a7d9a; padding-bottom: 3px; margin-bottom: 10px;">
    <div style="font-size: 11pt; font-weight: 700; color: #111827;">${data.name} <span style="font-size: 9pt; font-weight: 500; color: #5a7d9a;">— Curriculum Vitae</span></div>
    <div style="font-size: 8pt; color: #6b7280;">✉️ ${data.contact.email} · 📍 ${data.contact.based_in}</div>
  </div>

  <!-- Awards -->
  ${data.awards && data.awards.length > 0 ? `
  <div class="section" style="margin-bottom: 10px;">
    <div class="section-title">Awards & Honors</div>
    ${data.awards.map(award => `
      <div class="award-item">
        <div class="award-header">
          <span class="award-title">${award.title}</span>
          <span class="job-dates">${award.date}</span>
        </div>
        <div class="award-meta">Issued by <strong>${award.issuer}</strong> ${award.associated_with ? `· Associated with ${award.associated_with}` : ''}</div>
        <div class="award-desc">${award.description}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  <!-- Education -->
  <div class="section" style="margin-bottom: 10px;">
    <div class="section-title">Education</div>
    <div class="edu-grid">
      ${data.education.map(edu => {
        let detailsHtml = '';
        if (edu.details) {
          detailsHtml = edu.details.map(d => {
            const k = Object.keys(d)[0];
            const v = d[k];
            if (Array.isArray(v)) {
              return `<div><strong>${k}:</strong> ${v.join(', ')}</div>`;
            }
            return `<div><strong>${k}:</strong> ${v}</div>`;
          }).join('');
        }
        return `
          <div class="edu-item">
            <div class="edu-inst">${edu.institution}</div>
            <div class="edu-degree">${edu.degree || edu.program || ''}</div>
            <div class="edu-year">${edu.years || edu.year || ''}</div>
            <div class="edu-details">${detailsHtml}</div>
          </div>
        `;
      }).join('')}
    </div>
  </div>

  <!-- Two Column: Skills on Left, Leadership/Interests/Referees on Right -->
  <div class="two-column">
    <!-- Left Column: Skills -->
    <div>
      <div class="section-title">Skills & Technologies</div>
      <div class="skill-category">
        <div class="skill-cat-title">Languages & Frameworks</div>
        <div class="skill-pill-list">${data.software_engineering_skills.programming_languages_frameworks.join(', ')}</div>
      </div>
      ${Object.entries(data.software_engineering_skills.other_tools).map(([category, tools]) => `
        <div class="skill-category" style="margin-top: 5px;">
          <div class="skill-cat-title">${formatCategoryTitle(category)}</div>
          <div class="skill-pill-list">${tools.join(', ')}</div>
        </div>
      `).join('')}
    </div>

    <!-- Right Column: Leadership & Interests & Referees -->
    <div>
      <div class="section-title">Leadership & Activities</div>
      <div class="skill-category">
        <div class="skill-cat-title">Leadership Highlights</div>
        <div class="skill-pill-list" style="font-size: 8pt;">
          ${data.leadership_positions.join(' · ')}
        </div>
      </div>

      <div class="skill-category" style="margin-top: 6px;">
        <div class="skill-cat-title">Personal Interests & Languages</div>
        <div class="skill-pill-list">
          <strong>Languages:</strong> ${data.interests_other_skills.languages.join(', ')}<br/>
          <strong>Taekwondo:</strong> ${data.interests_other_skills.taekwondo}<br/>
          <strong>Orchestral:</strong> ${data.interests_other_skills.orchestral_performance.join(', ')}
        </div>
      </div>

      <div class="section-title" style="margin-top: 10px;">Referees</div>
      <div class="referee-grid">
        ${data.referees.map(ref => `
          <div class="referee-card">
            <div class="ref-name">${ref.name}</div>
            <div class="ref-meta">${ref.position}, ${ref.company}</div>
            <div class="ref-contact">✉️ ${ref.contact}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

</body>
</html>`;
}

async function main() {
  const yamlPath = path.join(rootDir, 'public', 'resume.yml');
  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  const data = yaml.load(yamlContent);

  const htmlContent = generatePrintHtml(data);
  const tempHtmlPath = path.join(rootDir, 'public', '.resume_print_temp.html');
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

  const pdfOutputPath = path.join(rootDir, 'public', 'marcus_low_cv.pdf');
  const chromeBin = findChrome();
  console.log(`Using Chrome binary: ${chromeBin}`);

  const cmd = `"${chromeBin}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfOutputPath}" "file://${tempHtmlPath}"`;
  execSync(cmd, { stdio: 'inherit' });

  // Clean up temp html
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  // Also create a symlink or copy to resume.pdf
  const resumePdfPath = path.join(rootDir, 'public', 'resume.pdf');
  fs.copyFileSync(pdfOutputPath, resumePdfPath);

  console.log(`✅ PDF successfully generated at:\n  - ${pdfOutputPath}\n  - ${resumePdfPath}`);
}

main().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
