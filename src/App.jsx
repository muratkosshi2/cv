import { useEffect, useRef, useState } from 'react';
import { resumeData } from './data/resumeData';
import gitlab from './data/gitlab-calendar.json';

const LANGS = { ru: 'RU', en: 'EN', kz: 'KZ' };
const SECTIONS = ['summary', 'highlights', 'experience', 'projects', 'skills', 'education'];
const INTL_LOCALE = { ru: 'ru', en: 'en', kz: 'kk' };

// 24×24 outline icons; GitLab mark from Simple Icons (CC0)
const ICONS = {
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  telegram: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  gitlab: <path fill="currentColor" stroke="none" d="m23.6 9.59-.03-.09L20.3.98a.85.85 0 0 0-.34-.4.88.88 0 0 0-1 .05.88.88 0 0 0-.29.44l-2.2 6.75H7.54L5.33 1.07a.86.86 0 0 0-.29-.44.88.88 0 0 0-1-.05.86.86 0 0 0-.34.4L.43 9.5l-.03.09a6.07 6.07 0 0 0 2.01 7.01l.01.01.03.02 4.98 3.73 2.46 1.86 1.5 1.13a1.01 1.01 0 0 0 1.22 0l1.5-1.13 2.46-1.86 5.01-3.75.01-.01a6.07 6.07 0 0 0 2.01-7z" />,
};

const CONTACTS = [
  { icon: 'phone', label: '+7 777 433 49 49', href: 'tel:+77774334949' },
  { icon: 'mail', label: 'murat.kosshi@gmail.com', href: 'mailto:murat.kosshi@gmail.com' },
  { icon: 'telegram', label: 't.me/muratkosshi', href: 'https://t.me/muratkosshi' },
  { icon: 'gitlab', label: 'gitlab.com/murat.kosshi', href: 'https://gitlab.com/murat.kosshi' },
];

const initialLang = () => {
  const lang = new URLSearchParams(window.location.search).get('lang');
  return lang in LANGS ? lang : 'ru';
};

function formatPeriod(start, end, lang, presentLabel) {
  // kk short months render as "2025 M05", so Kazakh falls back to numeric
  const opts = lang === 'kz' ? { month: '2-digit', year: 'numeric' } : { month: 'short', year: 'numeric' };
  const fmt = new Intl.DateTimeFormat(INTL_LOCALE[lang], opts);
  const toText = (ym) => (ym === 'present' ? presentLabel : fmt.format(new Date(`${ym}-01`)));
  return `${toText(start)} — ${toText(end)}`;
}

function Html({ as = 'span', children }) {
  const Tag = as;
  return <Tag dangerouslySetInnerHTML={{ __html: children }} />;
}

function Section({ id, title, children }) {
  return (
    <section className="section" id={id}>
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

function Job({ job, lang, labels }) {
  return (
    <article className="row">
      <div className="row-aside">{formatPeriod(job.start, job.end, lang, labels.present)}</div>
      <div className="row-main">
        <h3 className="job-title">
          {job.title} <span className="job-company">· {job.company}</span>
        </h3>
        {job.intro && <Html as="p">{job.intro}</Html>}
        {job.stack && <p className="stack">{job.stack.join(' · ')}</p>}
        {job.items?.length > 0 && (
          <ul className="list">
            {job.items.map((item) => <Html as="li" key={item}>{item}</Html>)}
          </ul>
        )}
        {job.projects?.map((p) => (
          <div className="subproject" key={p.name}>
            <h4>{p.name}</h4>
            {p.note && <Html as="p">{p.note}</Html>}
            <ul className="list">
              {p.items.map((item) => <Html as="li" key={item}>{item}</Html>)}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

// GitLab's own buckets: 0, 1–9, 10–19, 20–29, 30+
const level = (n) => (n ? Math.min(4, Math.floor(n / 10) + 1) : 0);
const isoDay = (d) => d.toISOString().slice(0, 10);

function Activity({ lang, labels }) {
  const end = new Date(`${gitlab.fetchedAt}T00:00:00Z`);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 364 - ((end.getUTCDay() + 6) % 7)); // align to Monday

  const weeks = [];
  for (const d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    if ((d.getUTCDay() + 6) % 7 === 0) weeks.push([]);
    const day = isoDay(d);
    weeks.at(-1).push({ day, count: gitlab.days[day] ?? 0 });
  }

  const total = Object.entries(gitlab.days).reduce((sum, [day, n]) => (day >= isoDay(start) ? sum + n : sum), 0);
  const month = new Intl.DateTimeFormat(INTL_LOCALE[lang], { month: 'short', timeZone: 'UTC' });

  return (
    <div className="activity">
      <div className="activity-scroll">
        <div className="activity-months">
          {weeks.map((w, i) => {
            const first = w.find((c) => c.day.endsWith('-01'));
            return <span key={w[0].day}>{first && i < weeks.length - 2 ? month.format(new Date(first.day)) : ''}</span>;
          })}
        </div>
        <div className="activity-grid">
          {weeks.map((w) => (
            <div key={w[0].day} className="activity-week">
              {w.map((c) => <i key={c.day} className={`l${level(c.count)}`} title={`${c.day}: ${c.count}`} />)}
            </div>
          ))}
        </div>
      </div>
      <p className="activity-foot">
        <a href="https://gitlab.com/murat.kosshi" target="_blank" rel="noreferrer">
          {labels.contributions.replace('{n}', total.toLocaleString(INTL_LOCALE[lang]))}
        </a>
        <span className="activity-legend">
          {labels.less} {[0, 1, 2, 3, 4].map((l) => <i key={l} className={`l${l}`} />)} {labels.more}
        </span>
      </p>
    </div>
  );
}

function Project({ project }) {
  return (
    <article className="project">
      <div>
        <h3>
          {project.icon && <img className="app-icon" src={project.icon} alt="" />}
          {project.title}
        </h3>
        <Html as="p">{project.description}</Html>
        {project.links?.length > 0 && (
          <p className="links">
            {project.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.text} ↗</a>)}
          </p>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [lang, setLang] = useState(initialLang);
  const d = resumeData[lang];
  const { labels } = d;
  const [active, setActive] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    // a section counts as current once it crosses the upper third of the viewport
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -65% 0px' },
    );
    SECTIONS.forEach((id) => observer.observe(document.getElementById(id)));
    // the last section is too short to reach that line, so the page bottom selects it
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) setActive(SECTIONS.at(-1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    // keep the current link visible when the nav scrolls horizontally on phones
    navRef.current?.querySelector('.current')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [active]);

  const changeLang = (next) => {
    setLang(next);
    document.documentElement.lang = INTL_LOCALE[next];
    const url = new URL(window.location);
    url.searchParams.set('lang', next);
    window.history.replaceState({}, '', url);
  };

  return (
    <div className="page">
      <div className="topbar">
        <nav className="sections" ref={navRef}>
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={id === active ? 'current' : ''}>{labels[id]}</a>
          ))}
        </nav>
        <div className="toolbar">
          {Object.entries(LANGS).map(([code, label]) => (
            <button key={code} className={code === lang ? 'active' : ''} onClick={() => changeLang(code)}>
              {label}
            </button>
          ))}
          <button onClick={() => window.print()}>PDF</button>
        </div>
      </div>

      <header className="head">
        <img className="photo" src="/img.png" alt={d.name} />
        <div>
          <h1>{d.name}</h1>
          <p className="role">{d.role}</p>
          <p className="location">{d.location}</p>
          <ul className="contacts">
            {CONTACTS.map((c) => (
              <li key={c.href}>
                <a href={c.href} target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[c.icon]}</svg>
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
          <Activity lang={lang} labels={labels} />
        </div>
      </header>

      <Section id="summary" title={labels.summary}>
        <Html as="div">{d.summary}</Html>
      </Section>

      <Section id="highlights" title={labels.highlights}>
        <ol className="highlights">
          {d.highlights.map((h) => <Html as="li" key={h}>{h}</Html>)}
        </ol>
      </Section>

      <Section id="experience" title={labels.experience}>
        {d.experience.map((job) => <Job key={job.company + job.start} job={job} lang={lang} labels={labels} />)}
      </Section>

      <Section id="projects" title={labels.projects}>
        {d.projects.map((p) => <Project key={p.title} project={p} />)}
      </Section>

      <Section id="skills" title={labels.skills}>
        <dl className="skills">
          {d.skills.map((g) => (
            <div key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="education" title={labels.education}>
        {d.education.map((e) => (
          <article className="row" key={e.place}>
            <div className="row-aside">{e.year}</div>
            <div className="row-main">
              <h3 className="job-title">{e.place}</h3>
              <p>{e.field}</p>
            </div>
          </article>
        ))}
      </Section>

      <footer className="foot">© {new Date().getFullYear()} {d.name}</footer>
    </div>
  );
}
