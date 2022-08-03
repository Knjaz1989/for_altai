const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');
const escapeRegExp = require('lodash.escaperegexp');

// the directory in which you're outputting your build
let baseDir = '../templates'

/*
// the name for the directory where your static files will be moved to
let staticDir = 'static'
// the directory where your built files (css and JavaScript) will be moved  to
let assetsDir = 'assets'
// if the staticDir directory isn't there, create it
if (!fs.existsSync(path.join(__dirname, baseDir, staticDir))){
  fs.mkdirSync(path.join(__dirname, baseDir, staticDir));
}
// same for the assetsDir directory
if (!fs.existsSync(path.join(__dirname, baseDir, assetsDir))){
  fs.mkdirSync(path.join(__dirname, baseDir, assetsDir));
}
*/

//****//
let noHtmlDir = '../static';
let jsDir = 'js';
let cssDir = 'css';
let mapsDir = 'css';
let imagesDir = 'images';

// Added by Alex Gnutov - same for the noHtmlDir directory
if (!fs.existsSync(path.join(__dirname, noHtmlDir))){
  fs.mkdirSync(path.join(__dirname, noHtmlDir));
}
if (!fs.existsSync(path.join(__dirname, noHtmlDir, jsDir))){
  fs.mkdirSync(path.join(__dirname, noHtmlDir, jsDir));
}
if (!fs.existsSync(path.join(__dirname, noHtmlDir, cssDir))){
  fs.mkdirSync(path.join(__dirname, noHtmlDir, cssDir));
}
if (!fs.existsSync(path.join(__dirname, noHtmlDir, mapsDir))){
  fs.mkdirSync(path.join(__dirname, noHtmlDir, mapsDir));
}
if (!fs.existsSync(path.join(__dirname, noHtmlDir, imagesDir))){
  fs.mkdirSync(path.join(__dirname, noHtmlDir, imagesDir));
}

// Loop through the baseDir directory
fs.readdir(`./${baseDir}`, (err, files) => {
  // store all files in custom arrays by type
  let html = []
  let js = []
  let css = []
  let maps = []
  let staticAssets = []

  files.forEach(file => {
    // first HTML files
    if(file.match(/.+\.(html)$/)) {
      console.log('html match', file)
      html.push(file)
    } else  if(file.match(/.+\.(js)$/)) { // then JavaScripts
      js.push(file)
    } else if(file.match(/.+\.(map)$/)) { // then CSS
      maps.push(file)
    } else if(file.match(/.+\.(css)$/)) { // then sourcemaps
      css.push(file)
    } else if(file.match(/.+\..+$/)){ // all other files, exclude current directory and directory one level up
      staticAssets.push(file)
    }
  });
  // check what went where
  console.log('html', html, 'css', css, 'js', js, 'staticAssets', staticAssets)

  // create an array for all compiled assets
  let assets = css.concat(js).concat(maps)

  // replace all other resources in html
  html.forEach(
    file => {
      staticAssets.forEach(name => {
        let options = {
          files: path.join(baseDir, file),
          from: new RegExp(escapeRegExp(name), 'g'),
          to: imagesDir + '/' + name
        }
        try {
          let changedFiles = replace.sync(options);
          console.log('Modified files:', changedFiles.join(', '));
        }
        catch (error) {
          console.error('Error occurred:', error);
        }
      });

      js.forEach(name => {
        let options = {
          files: path.join(baseDir, file),
          from: new RegExp(escapeRegExp(name), 'g'),
          to: jsDir + '/' + name
        }
        try {
          let changedFiles = replace.sync(options);
          console.log('Modified files:', changedFiles.join(', '));
        }
        catch (error) {
          console.error('Error occurred:', error);
        }
      });

      css.forEach(name => {
        let options = {
          files: path.join(baseDir, file),
          from: new RegExp(escapeRegExp(name), 'g'),
          to: cssDir + '/' + name
        }
        try {
          let changedFiles = replace.sync(options);
          console.log('Modified files:', changedFiles.join(', '));
        }
        catch (error) {
          console.error('Error occurred:', error);
        }
      });

      maps.forEach(name => {
        let options = {
          files: path.join(baseDir, file),
          from: new RegExp(escapeRegExp(name), 'g'),
          to: mapsDir + '/' + name
        }
        try {
          let changedFiles = replace.sync(options);
          console.log('Modified files:', changedFiles.join(', '));
        }
        catch (error) {
          console.error('Error occurred:', error);
        }
      })
    }
  )

  // replace map links in js
  js.forEach(
    file => {
      maps.forEach(name => {
        let options = {
          files: path.join(baseDir, file),
          from: name,
          to: '../' + mapsDir + '/' + name
        }
        try {
          let changedFiles = replace.sync(options);
          console.log('Modified files:', changedFiles.join(', '));
        }
        catch (error) {
          console.error('Error occurred:', error);
        }
      })
    }
  )

  // replace links in css
  css.forEach(
    file => {
      staticAssets.forEach(name => {
        let options = {
          files: path.join(baseDir, file),
          from: new RegExp(escapeRegExp(name), 'g'),
          to: '../' + imagesDir + '/' + name
        }
        try {
          let changedFiles = replace.sync(options);
          console.log('Modified files:', changedFiles.join(', '));
        }
        catch (error) {
          console.error('Error occurred:', error);
        }
      })
    }
  )

  // move js and css and maps
  js.forEach(
    name => {
      fs.rename(path.join(__dirname, baseDir, name), path.join(__dirname, noHtmlDir, jsDir,  name), function (err) {
        if (err) throw err
        console.log(`Successfully moved ${name}`)
      })
    }
  );
  css.forEach(
    name => {
      fs.rename(path.join(__dirname, baseDir, name), path.join(__dirname, noHtmlDir, cssDir,  name), function (err) {
        if (err) throw err
        console.log(`Successfully moved ${name}`)
      })
    }
  )
  maps.forEach(
    name => {
      fs.rename(path.join(__dirname, baseDir, name), path.join(__dirname, noHtmlDir, mapsDir,  name), function (err) {
        if (err) throw err
        console.log(`Successfully moved ${name}`)
      })
    }
  )
  // move staticAssets
  staticAssets.forEach(
    name => {
      fs.rename(path.join(__dirname, baseDir, name), path.join(__dirname, noHtmlDir, imagesDir,  name), function (err) {
        if (err) throw err
        console.log(`Successfully moved ${name}`)
      })
    }
  )




});
