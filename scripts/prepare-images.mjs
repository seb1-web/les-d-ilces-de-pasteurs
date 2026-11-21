import sharp from 'sharp';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const source = 'public/Images';
const destination = 'public/Images/optimized';
await mkdir(destination, { recursive: true });
await mkdir('artifacts', { recursive: true });
const files = (await readdir(source)).filter(file => /\.jpg$/i.test(file));
const manifest = [];
for (const file of files) {
  const input = path.join(source, file);
  const output = path.join(destination, file.replace(/\.jpg$/i, '.webp'));
  const result = await sharp(input).rotate().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
  manifest.push({ file, originalBytes: (await stat(input)).size, optimizedBytes: result.size });
}
for (const name of ['logo_V2_Noel', 'logo_V_Noel_Photoroom']) {
  await sharp(`src/assets/img/${name}.png`).trim().resize({ width: 700, withoutEnlargement: true }).webp({ quality: 90 }).toFile(`${destination}/${name}.webp`);
}
const tiles = [];
for (let i = 0; i < files.length; i++) {
  const picture = await sharp(path.join(source, files[i])).rotate().resize(220, 150, { fit: 'cover' }).toBuffer();
  const label = Buffer.from(`<svg width="220" height="30"><rect width="220" height="30" fill="#faf9f9"/><text x="10" y="22" font-family="Arial" font-size="18">${files[i]}</text></svg>`);
  tiles.push({ input: picture, left: (i % 6) * 220, top: Math.floor(i / 6) * 180 });
  tiles.push({ input: label, left: (i % 6) * 220, top: Math.floor(i / 6) * 180 + 150 });
}
await sharp({ create: { width: 1320, height: Math.ceil(files.length / 6) * 180, channels: 3, background: '#faf9f9' } }).composite(tiles).jpeg({ quality: 80 }).toFile('artifacts/photo-inventory.jpg');
await writeFile('artifacts/image-optimization.json', JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({ count: files.length, before: manifest.reduce((n,x)=>n+x.originalBytes,0), after: manifest.reduce((n,x)=>n+x.optimizedBytes,0) }));
