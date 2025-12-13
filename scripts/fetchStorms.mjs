#!/usr/bin/env node
import { load as loadCheerio } from 'cheerio';
import fs from 'fs';
import path from 'path';

const WIKI_URL =
  'https://en.wikipedia.org/wiki/2025%E2%80%9326_European_windstorm_season';

function normalizeDateString(str) {
  // Attempt a simple normalisation for day ranges and single dates to ISO format
  // e.g. '8–11 December 2025' -> { start: '2025-12-08', end: '2025-12-11' }
  const yearMatch = str.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : null;
  const monthMatch = str.match(
    /(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)/i
  );
  const month = monthMatch ? monthMatch[0] : null;
  const dayRangeMatch = str.match(/(\d{1,2})\s*(?:–|-|to)\s*(\d{1,2})/);
  const singleDayMatch = str.match(/(\d{1,2})(?:st|nd|rd|th)?/);
  if (!year || !month) {
    return null;
  }
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth() + 1;
  if (dayRangeMatch) {
    const start =
      String(year) +
      '-' +
      String(monthIndex).padStart(2, '0') +
      '-' +
      String(dayRangeMatch[1]).padStart(2, '0');
    const lastDay = String(dayRangeMatch[2]).padStart(2, '0');
    const endDate = new Date(
      `${year}-${String(monthIndex).padStart(2, '0')}-${lastDay}T00:00:00Z`
    );
    endDate.setUTCDate(endDate.getUTCDate() + 1);
    const endISO = endDate.toISOString().split('.')[0] + 'Z';
    return { start: `${start}T00:00:00Z`, end: endISO };
  }
  if (singleDayMatch) {
    const day = String(singleDayMatch[1]).padStart(2, '0');
    const start = `${year}-${String(monthIndex).padStart(2, '0')}-${day}T00:00:00Z`;
    // Make a one day span. end is next day at midnight
    const d = new Date(
      `${year}-${String(monthIndex).padStart(2, '0')}-${day}T00:00:00Z`
    );
    const endDate = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    const endISO = endDate.toISOString().split('.')[0] + 'Z';
    return { start, end: endISO };
  }
  return null;
}

export async function fetchSeasonEffects(htmlOverride) {
  let html = htmlOverride;
  if (!html) {
    const res = await fetch(WIKI_URL, { redirect: 'follow' });
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    html = await res.text();
  }
  const $ = loadCheerio(html);

  const seasonEffectsHeader = $('span.mw-headline')
    .filter((i, el) => $(el).text().trim().toLowerCase() === 'season effects')
    .first();
  if (!seasonEffectsHeader || seasonEffectsHeader.length === 0) {
    console.error('Could not find Season effects header on the page');
    return;
  }

  // The table is normally the next table after the heading
  const table = seasonEffectsHeader.parent().nextAll('table.wikitable').first();
  if (!table || table.length === 0) {
    console.error('Could not find Season effects table');
    return;
  }

  const storms = [];
  table.find('tr').each((i, row) => {
    if (i === 0) return; // header row
    const cells = $(row).find('td');
    // Many Wikipedia tables have variable columns; attempt to map Name and Date(s) columns
    const nameCell = $(cells[0]).text().trim();
    const dateCell = $(cells[1]).text().trim();
    if (!nameCell) return;
    const dates = normalizeDateString(dateCell);
    storms.push({
      name: nameCell,
      dateRaw: dateCell,
      start: dates?.start || null,
      end: dates?.end || null,
    });
  });

  const outDir = path.resolve(process.cwd(), 'data', 'storms');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.resolve(outDir, 'season_effects.json');
  fs.writeFileSync(outFile, JSON.stringify(storms, null, 2));
  console.log(`Wrote ${storms.length} storms to ${outFile}`);
  return storms;
}

if (
  process.argv[1] &&
  process.argv[1].endsWith('fetchStorms.mjs') &&
  !process.env.JEST_WORKER_ID
) {
  // When run as script use network fetch
  fetchSeasonEffects().catch((err) => {
    console.error('Failed to fetch storms', err);
    process.exit(1);
  });
}
