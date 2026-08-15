import { spawnSync } from 'node:child_process';
import { readdirSync, renameSync, existsSync, unlinkSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const DIR = resolve('public/videos');
const files = readdirSync(DIR).filter((f) => f.endsWith('.mp4'));

function probeDuration(path) {
  const r = spawnSync(
    ffmpeg,
    ['-hide_banner', '-i', path],
    { encoding: 'utf8' },
  );
  const m = (r.stderr || '').match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
  if (!m) return null;
  return +m[1] * 3600 + +m[2] * 60 + +m[3];
}

function detectBlacks(path) {
  const r = spawnSync(
    ffmpeg,
    ['-hide_banner', '-i', path, '-vf', 'blackdetect=d=0.05:pix_th=0.10', '-an', '-f', 'null', '-'],
    { encoding: 'utf8' },
  );
  const text = (r.stderr || '') + (r.stdout || '');
  const matches = [...text.matchAll(/black_start:(\d+\.?\d*)\s+black_end:(\d+\.?\d*)/g)];
  return matches.map((m) => ({ start: +m[1], end: +m[2] }));
}

for (const file of files) {
  const path = join(DIR, file);
  const dur = probeDuration(path);
  if (!dur) continue;
  const blacks = detectBlacks(path);

  let trimStart = 0;
  let trimEnd = dur;

  // leading black
  const lead = blacks.find((b) => b.start < 0.15);
  if (lead) trimStart = Math.min(lead.end + 0.05, 1.2);

  // trailing black
  const tail = blacks.find((b) => b.end > dur - 0.2);
  if (tail) trimEnd = Math.max(tail.start - 0.05, trimStart + 0.5);

  if (trimStart === 0 && Math.abs(trimEnd - dur) < 0.05) {
    console.log(`- ${file}: no fades (${dur.toFixed(2)}s)`);
    continue;
  }

  const newDur = trimEnd - trimStart;
  const tmp = path.replace(/\.mp4$/, '.trim.mp4');
  console.log(`+ ${file}: ${dur.toFixed(2)}s -> ${newDur.toFixed(2)}s (cut ${trimStart.toFixed(2)}s head, ${(dur-trimEnd).toFixed(2)}s tail)`);
  const r = spawnSync(
    ffmpeg,
    [
      '-y', '-hide_banner', '-loglevel', 'error',
      '-ss', trimStart.toFixed(3),
      '-i', path,
      '-t', newDur.toFixed(3),
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
      '-movflags', '+faststart',
      '-an',
      tmp,
    ],
    { stdio: ['ignore', 'inherit', 'inherit'] },
  );
  if (r.status !== 0) {
    console.error(`  failed for ${file}`);
    if (existsSync(tmp)) unlinkSync(tmp);
    continue;
  }
  unlinkSync(path);
  renameSync(tmp, path);
  const after = statSync(path).size;
  console.log(`  -> ${(after/1e6).toFixed(1)}MB`);
}
console.log('Done.');
