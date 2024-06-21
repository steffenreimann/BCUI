var sass = require('node-sass');
var fs = require('fs')
var path = require('path')
const chokidar = require('chokidar');
var sassCompileFiles = ['bcui'];
var liveServer = require("live-server");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const liveServerConfig = require('./liveserver.config.js');

async function renderSCSS() {
    return new Promise(async function (resolve, reject) {

        for (const key in sassCompileFiles) {
            const element = path.join(__dirname, 'src', 'style', sassCompileFiles[key] + '.scss');
            try {
                sass.render({
                    file: element,
                    outFile: path.join(__dirname, 'dist', sassCompileFiles[key] + '.css'),
                    sourceMap: true
                }, function (err, result) {
                    if (err) {
                        console.log("err", err.formatted);
                        //reject(err);
                    } else {
                        fs.writeFile(path.join(__dirname, 'dist', sassCompileFiles[key] + '.css'), result.css, function (err) {
                            if (err) {
                                console.log('SCSS File write to Disk Error = ', err);
                            } else {
                                resolve(result);
                            }
                        });

                        fs.writeFile(path.join(__dirname, 'dist', sassCompileFiles[key] + '.css.map'), result.map, function (err) {
                            if (err) {
                                console.log('SCSS File write to Disk Error = ', err);
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
            } catch (error) {
                console.log("error", error);
            }
        }
    })
}

function watchSCSS() {
    chokidar.watch(path.join(__dirname, 'src')).on('change', (event, path) => {
        buildAll()
    });
    console.log('Watching', path.join(__dirname, 'src'));
}

async function buildAll() {
    //console.log(event, path);
    var renderBegin = new Date();
    await renderSCSS(true)
    await build();
    var renderEnd = new Date();
    var duration = renderEnd - renderBegin;
    console.log('JS und CSS compiled in ' + duration + 'ms');
}

async function build() {
    try {
        const compiler = webpack(webpackConfig);

        await new Promise((resolve, reject) => {
            compiler.run((err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
        });
    } catch (error) {
        console.log('TS Compile Error');
    }
}

liveServer.start(liveServerConfig);

buildAll()
watchSCSS()
