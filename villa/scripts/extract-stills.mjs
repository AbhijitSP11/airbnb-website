import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const SRC = resolve('../assets');
const OUT_IMG = resolve('public/images');
const OUT_VID = resolve('public/videos');
mkdirSync(OUT_IMG, { recursive: true });
mkdirSync(OUT_VID, { recursive: true });

// Source clips
const S = {
  drone: 'Drone_filming_tropical_beach_pro…_202608160051.mp4',
  beachApproach: 'Camera_moving_toward_beach_property_202608160052.mp4',
  exterior: 'Tropical_villa_exterior_establis…_1080p_202608160052.mp4',
  poolApproach: 'Camera_moving_toward_swimming_pool_202608160052.mp4',
  archReveal: 'Cinematic_architectural_reveal_o…_1080p_202608160052.mp4',
  dolly: 'Camera_dolly_through_luxury_prop…_202608160052.mp4',
  villaThrough: 'Camera_moving_through_luxury_villa_202608160052.mp4',
  bed1: 'Camera_moving_in_bedroom_1080p_202608160052.mp4',
  bed2: 'Camera_moving_around_luxury_bedroom_202608160052.mp4',
  bed3: 'Camera_pans_across_luxury_bedroom_202608160052.mp4',
};

// video slot -> source file
const videos = {
  'hero-drone.mp4': S.drone,
  'beach-reveal.mp4': S.beachApproach,
  'pool-exterior.mp4': S.exterior,
  'pool-reveal.mp4': S.poolApproach,
  'pool-to-entrance.mp4': S.archReveal,
  'living-room-entry.mp4': S.dolly,
  'dining-reveal.mp4': S.villaThrough,
  'bedroom-tour.mp4': S.bed1,
  'final-beach.mp4': S.drone,
};

// still filename -> [source, timestamp seconds]
const stills = {
  'beach-1.jpg': [S.drone, 3],
  'beach-2.jpg': [S.beachApproach, 2],
  'bed-1.jpg': [S.bed1, 2.5],
  'bed-2.jpg': [S.bed2, 2],
  'bed-3.jpg': [S.bed3, 1.5],
  'dining-1.jpg': [S.archReveal, 2],
  'dining-2.jpg': [S.villaThrough, 1.5],
  'living-room-1.jpg': [S.dolly, 1],
  'living-room-2.jpg': [S.dolly, 3],
  'living-room-3.jpg': [S.dolly, 5],
  'living-room-4.jpg': [S.villaThrough, 3.5],
  'exterior-1.jpg': [S.exterior, 2],
  'pool-1.jpg': [S.poolApproach, 2],
};

function run(args) {
  const r = spawnSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  if (r.status !== 0) {
    console.error('ffmpeg failed:', args.join(' '));
    console.error(r.stderr?.toString().slice(-500));
    process.exit(1);
  }
}

console.log('Copying videos...');
import('node:fs').then(({ copyFileSync }) => {
  for (const [name, src] of Object.entries(videos)) {
    const outPath = resolve(OUT_VID, name);
    if (!existsSync(outPath)) {
      copyFileSync(resolve(SRC, src), outPath);
      console.log('  ->', name);
    }
  }

  console.log('Extracting stills...');
  for (const [name, [src, t]] of Object.entries(stills)) {
    const outPath = resolve(OUT_IMG, name);
    if (existsSync(outPath)) continue;
    run([
      '-y', '-ss', String(t), '-i', resolve(SRC, src),
      '-frames:v', '1', '-q:v', '3', '-vf', 'scale=1920:-2', outPath,
    ]);
    console.log('  ->', name);
  }
  console.log('Done.');
});
