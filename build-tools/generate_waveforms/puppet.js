const puppeteer = require('puppeteer');
const proc = require('child_process');
const fs = require('fs');
const { join, basename, normalize } = require('path');
const _ = require("lodash");
const Promise = require("bluebird");

const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source => fs.readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const getFiles = source => fs.readdirSync(source)
    .map(name => join(source, name))
    .filter(file => !isDirectory(file) && !file.endsWith(".png"));

async function savefile(path, assetLoc, port) {
    console.info("Attempting: " + path);
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:' + port + '/build-tools/generate_waveforms/?path=' + encodeURIComponent("../../" + path.slice(assetLoc.length)));
    
    await page.waitForSelector('img');

    const img = await page.$("img");
    await img.screenshot({
        type: 'png',
        path: path.slice(0, -4) + '.png',
        omitBackground: false
    });


    await browser.close();
    return;
}

module.exports = async (assetLoc, topLevel, availablePort) => {

    assetLoc = assetLoc || __dirname + '/../src/assets';
    let serv = proc.exec('http-server ' + '-p ' + availablePort || 12345);
    
    getDirectories(assetLoc).forEach(dir => {
        Promise.all(getFiles(dir).map(async (i) => savefile(i, normalize(topLevel), availablePort)))
            .finally(() => {
                serv.kill('SIGTERM');
                process.exit();
            });
    });
}