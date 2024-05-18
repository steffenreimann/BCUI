var sass = require('node-sass');
var fs = require('fs')
var path = require('path')
const chokidar = require('chokidar');
var renderBegin = new Date();
var sassWatcherFiles = ['bcdefault', 'bcui', 'forms', 'grid', 'variables'];

async function renderSCSS(reloadClients) {
    return new Promise(async function (resolve, reject) {
        for (const key in sassWatcherFiles) {
            const element = path.join(__dirname, 'src', 'style', sassWatcherFiles[key] + '.scss');
            try {
                sass.render({
                    file: element,
                    outFile: path.join(__dirname, 'dist', sassWatcherFiles[key] + '.css'),
                    sourceMap: true
                }, function (err, result) {
                    if (err) {
                        console.log("err", err.formatted);
                        //reject(err);
                    } else {

                        //console.log('SCSS compiled!', result);
                        fs.writeFile(path.join(__dirname, 'dist', sassWatcherFiles[key] + '.css'), result.css, function (err) {
                            //

                            if (err) {
                                console.log('SCSS File write to Disk Error = ', err);
                            } else {
                                resolve(result);
                            }
                        });


                        fs.writeFile(path.join(__dirname, 'dist', sassWatcherFiles[key] + '.css.map'), result.map, function (err) {
                            //

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
    chokidar.watch(path.join(__dirname, 'src', 'style')).on('change', (event, path) => {
        //console.log(event, path);
        renderBegin = new Date();
        renderSCSS(true).then((res) => {
            console.log('SCSS Rendering Fertig.');
        })
    });

    console.log('Watching', path.join(__dirname, 'src', 'style'));
}

renderSCSS(true)
watchSCSS()
