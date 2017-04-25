const fs = require('fs');
const name = require('../package').name;
const assert = require('assert');

const file = require.resolve('../dist/index.d.ts');

let typings = fs.readFileSync(file, 'utf-8');

typings = typings
  .replace(/export\sdeclare/gm, 'export')
  .replace(/export/gm, '  export')
  .replace(/\}/gm, '  }\n');

typings = 'declare module "' + name + '" {\n' + typings + '}\n\n';

fs.writeFileSync(file, typings, 'utf-8');
