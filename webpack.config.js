
/*****/

var path = require('path');
const webpack = require('webpack');

var template = function(entry, output){
  var defaultEntry = {
  };
  Object.assign(defaultEntry, entry);

  var defaultOutput = {
    path: path.resolve(__dirname, './'),
    filename: '[name].js'
  };
  Object.assign(defaultOutput, output);
  
  return {
    entry: defaultEntry,
    devtool: 'source-map',
    output: defaultOutput,
    resolve: {
      alias: {
        'three': path.join(__dirname, './js/lib/three/three.js'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({ 'THREE': 'three' })
    ]
  };
};

module.exports = function(env){
  var bundle = template({'bundle':'./index.js'}, {});
  var code = 'if(typeof V3d === "undefined"){V3d = {};}if(typeof V3d.Navigation === "undefined")V3d.Navigation={};';
  var navCam = template({'V3d.Navigation':'./js/navcam/NavCam.js'}, {libraryTarget:'assign', library:(code + 'V3d.Navigation.NavCam')});

  var exportArray = [navCam, bundle];
  var exported, fileIndex;
  if(env !== undefined && env.file !== undefined && !isNaN(fileIndex = Number(env.file))) exported = exportArray[fileIndex];
  else exported = exportArray;

  return exported;
};