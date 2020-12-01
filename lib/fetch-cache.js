
import fetch from 'node-fetch';
import {promises as fsPromises} from 'fs';
import path from 'path';

const {pathname: cachePath} = new URL('../.cache/', import.meta.url);

function statOrNull(p) {
  return fsPromises.stat(p).catch((e) => null);
}

export async function fetchAndCache(url, expiry = (new Date() - 60 * 1000)) {
  const key = Buffer.from(url).toString('base64');

  const urlCachePath = path.join(cachePath, key);
  const stat = await statOrNull(urlCachePath);
  if (stat !== null && stat.mtime >= expiry) {
    return fsPromises.readFile(urlCachePath);
  }

  const r = await fetch(url);
  if (!r.ok) {
    throw new Error(`failed to fetch: ${r.status} ${r.statusText}: ${url}`);
  }
  const buffer = await r.buffer();

  await fsPromises.mkdir(cachePath, {recursive: true});
  await fsPromises.writeFile(urlCachePath, buffer);

  return buffer;
}
