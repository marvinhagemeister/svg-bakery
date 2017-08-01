const SVGSpriter = require('svg-sprite');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const File = require('vinyl');
const glob = require('glob');
const spriter = new SVGSpriter({
  dest: 'out',
  mode: {
    symbol: {
      dest: '',
      sprite: 'sprite.svg'
    }
  },
  shape: {
    id: {
      generator: (name) => path.basename(name.replace(/\.svg$/g, ''))
    }
  }
});

const cwd = process.cwd();

// Find SVG files recursively via `glob`
glob.glob('test/**/source/*.svg', { cwd }, (err, files) => {
  files.forEach(file => {

    // Create and add a vinyl file instance for each SVG
    spriter.add(new File({
      path: path.join(cwd, file),                         // Absolute path to the SVG file
      base: cwd,                                          // Base path (see `name` argument)
      contents: fs.readFileSync(path.join(cwd, file))     // SVG file contents
    }));
  });

  spriter.compile((error, result) => {
    for (const type in result.symbol) {
      if (result.symbol.hasOwnProperty(type)) {
        mkdirp.sync(path.dirname(result.symbol[type].path));
        fs.writeFileSync(result.symbol[type].path, result.symbol[type].contents);
      }
    }
  });
});
