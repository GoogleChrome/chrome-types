import { rewriteBlockComments } from './lib/typedoc-helper.js';

console.info(rewriteBlockComments(`consst x = 1; /** hello
* @what */ there`, x => x.toUpperCase()));