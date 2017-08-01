const path = require('path');
const SVGSpriter = require('svg-sprite');
const { find, readFile, writeFile } = require('nicer-fs');

function getSVGData(folder) {
  const globber = path.resolve(folder) + '/**/*.svg';

  return find(globber)
    .then(files => Promise.all(
        files.map(file => {
          return readFile(file)
            .then(content => {
              return {
                file,
                content
              };
            });
        })
    ));
}

function processSVGs(files, config) {
  if (files.length === 0) {
    return;
  }

  const options = {
    dest: config.dest,
    mode: {
      symbol: true
    }
  };

  const spriter = new SVGSpriter(options);

  for (let i = 0; i < files.length; i++) {
    spriter.add(files[i].file, 'sprite.svg', files[i].content);
  }

  return new Promise((resolve, reject) => {
    spriter.compile((err, result) => {
      if (err !== null) {
        reject(err);
      }

      let out = Object.keys(result).map(mode => {
        return Object.keys(result[mode]).map(key => {
          return result[mode][key];
        });
      });

      // Flatten array
      out = Array.prototype.concat.apply([], out);

      resolve(out);
    });
  });
}

function writeSVGs(files, options) {
  if (files.length === 0) {
    return;
  }

  return Promise.all(files.map(file => {
    const location = path.join(path.resolve(options.dest), path.basename(file.path));
    return writeFile(location, file.contents);
  }));
}

module.exports = function execute(folder, options) {
  return getSVGData(folder)
    .then(files => processSVGs(files, options))
    // .then(files => writeSVGs(files, options))
    .catch(err => console.error(err)); // eslint-disable-line no-console
};
