import { spawnSync } from 'node:child_process';
import { readdirSync, renameSync, existsSync, unlinkSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const DIR = resolve('public/videos');
const files = readdirSync(DIR).filter((f) => f.endsWith('.mp4') && !f.endsWith('.orig.mp4'));

function detect(path) {
  const r = spawnSync(
    ffmpeg,
    ['-hide_banner', '-ss', '2', '-t', '4', '-i', path, '-vf', 'cropdetect=24:2:0', '-f', 'null', '-'],
    { encoding: 'utf8' },
  );
  const text = (r.stderr || '') + (r.stdout || '');
  const matches = [...text.matchAll(/crop=(\d+):(\d+):(\d+):(\d+)/g)];
  if (!matches.length) return null;
  // pick the last / most stable
  const last = matches[matches.length - 1];
  return { w: +last[1], h: +last[2], x: +last[3], y: +last[4] };
}

function probe(path) {
  const r = spawnSync(
    ffmpeg,
    ['-hide_banner', '-i', path],
    { encoding: 'utf8' },
  );
  const text = r.stderr || '';
  const m = text.match(/Stream.*Video.*?(\d{2,5})x(\d{2,5})/);
  if (!m) return null;
  return { w: +m[1], h: +m[2] };
}

for (const file of files) {
  const path = join(DIR, file);
  const orig = probe(path);
  const crop = detect(path);
  if (!orig || !crop) {
    console.log(`- ${file}: skip (no data)`);
    continue;
  }
  const trimW = orig.w - crop.w;
  const trimH = orig.h - crop.h;
  if (trimW < 8 && trimH < 8) {
    console.log(`- ${file}: no bars (${orig.w}x${orig.h})`);
    continue;
  }
  // ensure even dims
  const cw = crop.w - (crop.w % 2);
  const ch = crop.h - (crop.h % 2);
  const cx = crop.x + (crop.x % 2);
  const cy = crop.y + (crop.y % 2);

  const tmp = path.replace(/\.mp4$/, '.crop.mp4');
  console.log(`+ ${file}: ${orig.w}x${orig.h} -> ${cw}x${ch} @ ${cx},${cy}`);
  const r = spawnSync(
    ffmpeg,
    [
      '-y', '-hide_banner', '-loglevel', 'error',
      '-i', path,
      '-vf', `crop=${cw}:${ch}:${cx}:${cy}`,
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
  const beforeSize = statSync(path).size;
  const afterSize = statSync(tmp).size;
  unlinkSync(path);
  renameSync(tmp, path);
  console.log(`  ${(beforeSize/1e6).toFixed(1)}MB -> ${(afterSize/1e6).toFixed(1)}MB`);
}

console.log('Done.');
