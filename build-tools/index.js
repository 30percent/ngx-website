var songlistGen = require("./generate-songlist");
var waveformGen = require("./generate_waveforms/puppet.js");

var srcDir = __dirname + "/../src/";
var albumDir = "assets/albums";

songlistGen(srcDir + albumDir, albumDir);
// waveformGen(srcDir + albumDir, srcDir + "../", 12345);