import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_LENGTH = 199;
const OFFICE_JOKE =
  'I put "works well under pressure" on my resume, not realizing they\'d use it as a staffing plan.';

function buildEntry(): string {
  const line = OFFICE_JOKE.trim();
  if (!line || /[\r\n]/.test(line)) {
    throw new Error('Entry must be a single non-empty line');
  }
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_LENGTH) {
    throw new Error(`Entry length ${chars} is outside 1..${MAX_LENGTH} characters`);
  }
  return line;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), buildEntry(), 'utf8');
