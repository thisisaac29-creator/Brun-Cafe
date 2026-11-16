import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scan(full);
    } else if (/\.(jpg|jpeg|png|webp|mp4)$/i.test(entry.name)) {
      const rel = path.relative('public', full).replace(/\\/g, '/');
      try {
        const out = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0 "${full}"`, { encoding: 'utf8' }).trim();
        const stat = fs.statSync(full);
        console.log(`${rel} | ${out} | ${(stat.size/1024).toFixed(0)} KB`);
      } catch (e) {
        console.log(`${rel} | error probing`);
      }
    }
  }
}

console.log('--- PUBLIC MEDIA AUDIT ---');
scan('public');

