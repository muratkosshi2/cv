// Fetches the GitLab contribution calendar at build time (gitlab.com sends no CORS headers,
// so the browser can't request it directly). On failure the previously committed file is kept.
import { writeFile } from 'node:fs/promises';

const USER = 'murat.kosshi';
const OUT = new URL('../src/data/gitlab-calendar.json', import.meta.url);

try {
  const res = await fetch(`https://gitlab.com/users/${USER}/calendar.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const days = await res.json();
  await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), days }) + '\n');
  console.log(`gitlab calendar: ${Object.keys(days).length} days`);
} catch (e) {
  console.warn(`gitlab calendar: fetch failed (${e.message}), keeping existing data`);
}
