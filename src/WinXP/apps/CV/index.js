import React from 'react';
import styled from 'styled-components';

const projects = [
  {
    name: 'Imobi Lançamentos',
    type: 'Real Estate Technology · Full-Stack & AI',
    description:
      'Contributed to a real-estate launch platform with property discovery, agency workflows, lead management and AI-supported lead insights. Also worked on the Android application and its Google Play release.',
    stack: 'Web platform · APIs · AI integrations · Android',
    url: 'https://imobilancamentos.com.br/',
  },
  {
    name: 'Futura Cloud',
    type: 'Cloud Infrastructure · Engineering',
    description:
      'Developing a cloud control plane and Linux node agent, including node enrollment, heartbeat, command scheduling and infrastructure inventory. The project separates implemented foundations from planned platform capabilities.',
    stack: 'Go · TypeScript · Docker · Linux · PostgreSQL',
    url: 'https://github.com/nmultimidia/futurahost3',
  },
  {
    name: 'Futura Desk',
    type: 'Business SaaS · Product Engineering',
    description:
      'Building a business workspace with CRM, pipeline, project and task workflows, finance features and a client portal. Some modules remain under development.',
    stack: 'TypeScript · React · Node.js · SQLite',
    url: 'https://futuradesk.space',
  },
  {
    name: 'Futura Mail',
    type: 'Webmail · Systems Integration',
    description:
      'Developing a webmail application as a separate product from the organisation’s own mail-server infrastructure, with mail-protocol and service integration work still in progress.',
    stack: 'Next.js · React · TypeScript · IMAP/SMTP integration (in development)',
  },
  {
    name: 'Discord Ticket Automation',
    type: 'Python · Backend Automation',
    description:
      'A Discord support bot for ticket workflows and technical-documentation storage, developed for a real client engagement.',
    stack: 'Python · APIs · Databases · Linux',
    url: 'https://github.com/nmultimidia/bot-tickets-infinity',
  },
];

const experience = [
  {
    role: 'Founder · N Multimídia | Building Grupo Futura',
    period: 'Entrepreneurship & Product Development',
    description:
      'Lead client projects and digital product development, combining software, automation and business problem-solving. Work includes websites, e-commerce, API integrations, business platforms and AI-assisted workflows.',
  },
  {
    role: 'Technical Intern · Angola Telecom',
    period: 'Telecommunications',
    description:
      'Gained practical exposure to telecommunications infrastructure, including UA5000, Tera ADSL/POTS, SDH/DWDM transmission links, Huawei TCP/IP technologies and UPS systems.',
  },
];

const skills = [
  ['Languages', 'JavaScript · TypeScript · Python · PHP · HTML · CSS'],
  ['Frontend', 'React · Next.js · Responsive Web Development'],
  ['Backend & APIs', 'Node.js · Express · REST APIs · API integrations'],
  ['Data', 'PostgreSQL · MySQL · SQLite · Supabase'],
  ['AI & Automation', 'LLM integrations · AI agents · n8n · Workflow automation'],
  ['Infrastructure', 'Linux · Docker · Git · Server deployment'],
  ['Telecommunications', 'TCP/IP · Asterisk/SIP · 4G/5G fundamentals'],
  ['Electronics', 'Altium Designer · Electronic schematics'],
];

export default function CV({ onClose }) {
  return (
    <Page>
      <Toolbar>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
        <ToolbarSpacer />
        <button type="button" onClick={() => window.print()}>Print / Save PDF</button>
        <button type="button" onClick={onClose}>Close</button>
      </Toolbar>

      <Document>
        <TopLine>CURRICULUM VITAE · PROFESSIONAL PROFILE</TopLine>
        <Hero>
          <div>
            <Eyebrow>FULL-STACK DEVELOPER · AI & AUTOMATION</Eyebrow>
            <Name>Gabriel Nathan Tati</Name>
            <Location>Luanda, Angola · Open to remote and international opportunities</Location>
            <Intro>
              I build practical digital products that help businesses operate,
              connect and grow — from web applications and e-commerce platforms
              to backend integrations, automation and AI-powered solutions.
              My experience combines hands-on client delivery, product
              development and a technical foundation in electronics and
              telecommunications.
            </Intro>
            <Links>
              <a href="mailto:bielnathanoficial@gmail.com">Email</a>
              <a href="https://github.com/gabrielnathantati2" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://github.com/nmultimidia" target="_blank" rel="noreferrer">N Multimídia</a>
              <a href="https://www.workana.com/freelancer/8082333beeccd2a6c7111466707db1ef" target="_blank" rel="noreferrer">Workana</a>
            </Links>
          </div>
          <Badge>OPEN TO<br />OPPORTUNITIES</Badge>
        </Hero>

        <Stats>
          <Stat><strong>45</strong><span>Workana client ratings</span></Stat>
          <Stat><strong>4</strong><span>Repeat clients</span></Stat>
          <Stat><strong>Global</strong><span>Client project experience</span></Stat>
        </Stats>

        <Section>
          <SectionTitle>Professional Experience</SectionTitle>
          {experience.map(item => (
            <Experience key={item.role}>
              <ExperienceHead>
                <h3>{item.role}</h3>
                <small>{item.period}</small>
              </ExperienceHead>
              <p>{item.description}</p>
            </Experience>
          ))}
          <Note>
            Client work has been delivered through N Multimídia, including
            projects commissioned through Workana. The profile currently
            displays 45 client ratings and indicates that 4 clients hired
            N Multimídia more than once.
          </Note>
          <TextLink href="https://www.workana.com/freelancer/8082333beeccd2a6c7111466707db1ef" target="_blank" rel="noreferrer">
            View client ratings and testimonials on Workana ↗
          </TextLink>
        </Section>

        <Section>
          <SectionTitle>Selected Products & Engineering Work</SectionTitle>
          <ProjectGrid>
            {projects.map(project => (
              <Project key={project.name}>
                <ProjectTop>
                  <h3>{project.name}</h3>
                  <small>{project.type}</small>
                </ProjectTop>
                <p>{project.description}</p>
                <Tech>{project.stack}</Tech>
                {project.url && (
                  <TextLink href={project.url} target="_blank" rel="noreferrer">
                    Explore project ↗
                  </TextLink>
                )}
              </Project>
            ))}
          </ProjectGrid>
          <Note>
            Some products are actively being developed. Project descriptions
            distinguish ongoing work from released client-facing products;
            not every planned feature is represented as production-ready.
          </Note>
        </Section>

        <Section>
          <SectionTitle>Technical Skills</SectionTitle>
          <SkillGrid>
            {skills.map(([label, value]) => (
              <Skill key={label}>
                <strong>{label}</strong>
                <span>{value}</span>
              </Skill>
            ))}
          </SkillGrid>
        </Section>

        <Section>
          <SectionTitle>Education</SectionTitle>
          <Education>
            <h3>BSc Computer Science</h3>
            <strong>University of the People</strong>
            <span>In progress · Online</span>
          </Education>
          <Education>
            <h3>Technical Qualification · Electronics & Telecommunications</h3>
            <strong>Technical Secondary Education</strong>
            <span>Completed 2021</span>
          </Education>
        </Section>

        <Section>
          <SectionTitle>Certifications & Professional Development</SectionTitle>
          <BulletList>
            <li>Google Cybersecurity Foundations — completed; continuing studies in the programme.</li>
            <li>Project Management certificate.</li>
            <li>Telecommunications Technician certification.</li>
            <li>Ongoing practical study in Python, software engineering, cloud infrastructure and AI automation.</li>
          </BulletList>
        </Section>

        <Section>
          <SectionTitle>Languages</SectionTitle>
          <LanguageList>
            <span><b>Portuguese</b> · Native</span>
            <span><b>English</b> · Intermediate to advanced</span>
            <span><b>Spanish</b></span>
            <span><b>Mandarin Chinese</b> · Beginner</span>
          </LanguageList>
        </Section>

        <Footer>
          <span>Gabriel Nathan Tati</span>
          <span>Last updated · November 2026</span>
          <span>Windows XP-inspired online CV</span>
        </Footer>
      </Document>
    </Page>
  );
}

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ece9d8;
  color: #202020;
  font-family: Tahoma, Arial, sans-serif;
`;

const Toolbar = styled.div`
  min-height: 30px;
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 3px 9px;
  background: linear-gradient(#fff, #e7e3d5);
  border-bottom: 1px solid #b8b4a5;
  color: #333;
  font-size: 11px;
  button {
    border: 1px solid #8b9eb7;
    border-radius: 3px;
    background: linear-gradient(#fff, #e4eaf3);
    padding: 4px 8px;
    color: #17365d;
    font: inherit;
    cursor: pointer;
  }
  button:hover { background: #fff; }
`;

const ToolbarSpacer = styled.div`flex: 1;`;

const Document = styled.main`
  overflow: auto;
  flex: 1;
  padding: 24px clamp(16px, 4vw, 42px) 28px;
  background: #fff;
  @media (max-width: 600px) { padding: 18px 14px 24px; }
`;

const TopLine = styled.div`
  color: #6b7280;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 1.7px;
  border-bottom: 1px solid #d7dce4;
  padding-bottom: 10px;
`;

const Hero = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  padding: 22px 0 18px;
  @media (max-width: 600px) { flex-direction: column; }
`;

const Eyebrow = styled.div`
  color: #1456a0;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1.2px;
`;

const Name = styled.h1`
  margin: 7px 0 4px;
  color: #172b4d;
  font-size: clamp(25px, 4vw, 34px);
  letter-spacing: -1px;
`;

const Location = styled.div`
  color: #5d6673;
  font-size: 11px;
`;

const Intro = styled.p`
  max-width: 760px;
  margin: 15px 0 12px;
  color: #303b4a;
  font-size: 12px;
  line-height: 1.75;
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px 15px;
  a { color: #0757a6; font-size: 11px; font-weight: bold; text-decoration: none; }
  a:hover { text-decoration: underline; }
`;

const Badge = styled.div`
  flex-shrink: 0;
  border: 1px solid #a5c49c;
  background: #eff8ec;
  color: #32652d;
  border-radius: 3px;
  padding: 8px 10px;
  font-size: 9px;
  line-height: 1.5;
  font-weight: bold;
  text-align: center;
  letter-spacing: .5px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin: 2px 0 22px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const Stat = styled.div`
  border: 1px solid #d6deea;
  background: #f5f8fc;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  strong { color: #174b83; font-size: 19px; }
  span { color: #5a6472; font-size: 10px; }
`;

const Section = styled.section`
  margin: 20px 0 0;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  padding-bottom: 7px;
  color: #17365d;
  border-bottom: 2px solid #6e9ed6;
  font-size: 14px;
`;

const Experience = styled.article`
  margin: 0 0 13px;
  h3 { margin: 0; color: #222f40; font-size: 12px; }
  p { margin: 6px 0 0; color: #485363; font-size: 11px; line-height: 1.65; }
`;

const ExperienceHead = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 12px;
  small { color: #697586; font-size: 10px; }
`;

const Note = styled.p`
  padding: 9px 11px;
  margin: 10px 0;
  border-left: 3px solid #7aa6d8;
  background: #f3f7fc;
  color: #526071;
  font-size: 10px;
  line-height: 1.6;
`;

const TextLink = styled.a`
  display: inline-block;
  color: #0757a6;
  font-size: 10px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 4px;
  &:hover { text-decoration: underline; }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
  @media (max-width: 680px) { grid-template-columns: 1fr; }
`;

const Project = styled.article`
  border: 1px solid #d8dee8;
  border-radius: 3px;
  padding: 11px 12px;
  background: #fbfcfe;
  h3 { margin: 0; color: #1e416b; font-size: 12px; }
  p { color: #485363; font-size: 10px; line-height: 1.6; margin: 8px 0; }
`;

const ProjectTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  small { color: #718096; font-size: 9px; }
`;

const Tech = styled.div`
  color: #455b73;
  font-size: 9px;
  line-height: 1.5;
  font-weight: bold;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Skill = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid #e6eaf0;
  padding: 7px 2px;
  strong { color: #273c56; font-size: 10px; }
  span { color: #566273; font-size: 10px; line-height: 1.5; }
`;

const Education = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 12px;
  h3 { margin: 0; font-size: 11px; color: #273c56; }
  strong, span { color: #5b6573; font-size: 10px; font-weight: normal; }
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #4e5968;
  font-size: 10px;
  line-height: 1.8;
`;

const LanguageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  span {
    border: 1px solid #dce3ec;
    background: #f7f9fc;
    padding: 7px 9px;
    color: #536173;
    font-size: 10px;
  }
  b { color: #263e5a; }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid #d7dce4;
  margin-top: 24px;
  padding-top: 10px;
  color: #87909c;
  font-size: 9px;
`;
