//here we'll generate our nice json file containing 'album' directory information
// for use by the songs service

const fs = require('fs');
const _ = require('lodash');
// const resolver = _.partial(require('path').resolve(__dirname + '../'));
const Promise = require('bluebird');
const { join, basename } = require('path');
const mm = require('musicmetadata');
const mmProm = Promise.promisify((filename, callback) => {
    return mm(fs.createReadStream(filename), callback);
});


const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source => fs.readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);
const hasAudioExt = str => {
    return _.find([".mp3", ".wav", ".ogg"], ext => str.endsWith(ext)) != null
}

const getFiles = source => fs.readdirSync(source)
    .map(name => join(source, name))
    .filter(file => !isDirectory(file) && hasAudioExt(file))
//create sort from https://www.npmjs.com/package/musicmetadata;

module.exports = function (assetLoc, finalLoc) {
    assetLoc = assetLoc || __dirname + '/../src/assets/albums';
    finalLoc = finalLoc || 'assets/albums';
    metaReaderProms = [];
    let result = {
        albums: {},
        location: 'assets/albums'
    }

    getDirectories(assetLoc).forEach(dir => {
        result.albums[basename(dir)] = [];
        getFiles(dir).map((file) => {
            metaReaderProms.push(mmProm(file)
                .then((meta) => {
                    let songInfo = _.merge(
                        { file: basename(file) },
                        _.pick(meta, ["album", "artist", "title", "track"])
                    )
                    result.albums[basename(dir)].push(songInfo);
                }))
        })
    })
    Promise.all(metaReaderProms).then(() => fs.writeFileSync(
        assetLoc + "/tracklist.json",
        JSON.stringify(result, null, 4),
        'utf8'))
}