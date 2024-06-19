var sass = require('node-sass');
var fs = require('fs')
var path = require('path')
const chokidar = require('chokidar');
const rollup = require('rollup').rollup;
var renderBegin = new Date();
var sassCompileFiles = ['bcui'];
var liveServer = require("live-server");
var typescript = require("rollup-plugin-typescript");
/* import { rollup } from 'rollup'; */
//import typescript from 'rollup-plugin-typescript';



async function renderSCSS(reloadClients) {
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

                        //console.log('SCSS compiled!', result);
                        fs.writeFile(path.join(__dirname, 'dist', sassCompileFiles[key] + '.css'), result.css, function (err) {
                            //

                            if (err) {
                                console.log('SCSS File write to Disk Error = ', err);
                            } else {
                                resolve(result);
                            }
                        });


                        fs.writeFile(path.join(__dirname, 'dist', sassCompileFiles[key] + '.css.map'), result.map, function (err) {
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


// see below for details on these options
const inputOptions = {
    input: "src/script/bcui.ts",
    plugins: [
        typescript()
    ]
};

// you can create multiple outputs from the same input to generate e.g.
// different formats like CommonJS and ESM
const outputOptionsList = [
    {
        dir: "dist",
        name: "bcui",
        format: 'iife',
    }
];

async function build() {
    let bundle;
    let buildFailed = false;
    try {



        //  tsc ./src/script/bcui.ts util.ts --target commonjs --outfile ./dist/bcui.js



        spawn
        // create a bundle
        bundle = await rollup(inputOptions);

        // an array of file names this bundle depends on
        //console.log(bundle.watchFiles);

        await generateOutputs(bundle);
    } catch (error) {
        buildFailed = true;
        // do some error reporting
        console.error('Dieser: ');
        console.error(error);
    }
    if (bundle) {
        // closes the bundle
        await bundle.close();
    }
    //return bundle.watchFiles
    //process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
    for (const outputOptions of outputOptionsList) {
        // generate output specific code in-memory
        // you can call this function multiple times on the same bundle object
        // replace bundle.generate with bundle.write to directly write to disk
        const { output } = await bundle.write(outputOptions);

    }
}


var params = {
    port: 8181, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    // root: "/", // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    ignore: 'src,node_modules', // comma-separated string for paths to ignore
    //file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    //mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [function (req, res, next) {

        console.log(req.url + ' wurde neu geladen');
        next();

    }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};



liveServer.start(params);

buildAll()
watchSCSS()
