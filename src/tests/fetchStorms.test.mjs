import fs from 'fs';
import path from 'path';
import { fetchSeasonEffects } from '../../scripts/fetchStorms.mjs';

const outFile = path.resolve(
  process.cwd(),
  'data',
  'storms',
  'season_effects.json'
);

describe('fetchSeasonEffects script', () => {
  let priorContent = null;
  beforeAll(() => {
    if (fs.existsSync(outFile)) {
      priorContent = fs.readFileSync(outFile, 'utf8');
    }
  });

  afterAll(() => {
    if (priorContent !== null) {
      fs.writeFileSync(outFile, priorContent, 'utf8');
    } else if (fs.existsSync(outFile)) {
      fs.unlinkSync(outFile);
    }
  });

  test('writes season_effects.json from HTML snippet and returns parsed storms', async () => {
    const sampleHtml = `
      <div>
        <h2><span class="mw-headline">Season effects</span></h2>
        <table class="wikitable">
          <tr><th>Name</th><th>Date(s)</th></tr>
          <tr><td>Bram</td><td>8–11 December 2025</td></tr>
        </table>
      </div>
    `;

    const storms = await fetchSeasonEffects(sampleHtml);

    expect(Array.isArray(storms)).toBe(true);
    const bram = storms.find((s) => s.name === 'Bram');
    expect(bram).toBeDefined();
    expect(bram.start).toEqual('2025-12-08T00:00:00Z');
    expect(bram.end).toEqual('2025-12-12T00:00:00Z');

    // Verify file exists and contains Bram
    const fileExists = fs.existsSync(outFile);
    expect(fileExists).toBe(true);
    const json = JSON.parse(fs.readFileSync(outFile, 'utf8'));
    expect(json.find((s) => s.name === 'Bram')).toBeDefined();
  });
});
