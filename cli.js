#!/usr/bin/env node

const { mongoExtend, importsExport } = require("./index");

const yargs = require("yargs");

yargs
    .version('1.0.0')
    .command('export', 'exports from all collections based on a query arguement', {
        dbName: {
            alias: 'd',
            demandOption: true,
            describe: 'MongoDB Database name to perform action on',
            type: 'string'
        },
        query: {
            alias: 'q',
            demandOption: true,
            describe: 'Query String to search through collections',
            type: 'string'
        },
        output: {
            alias: 'o',
            describe: 'Output directory name/location.',
            type: 'string'
        },
        uri: {
            alias: 'u',
            describe: 'URL/Hostname used to connect with external servers',
            type: 'string'
        }
    },
    (argv) => {

        const escapeJSON = (jsObj) => JSON.stringify(jsObj).replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
        
        const output = argv.output ? argv.output.replace(/\s/g, "X") : 'output';
        
        const query = escapeJSON(argv.query);
        
        mongoExtend(argv.dbName, query, output);


    })
    .command('import', 'imports all collections exported from the export command (JSON format)', {
        dbName: {
            alias: 'd',
            demandOption: true,
            describe: 'MongoDB Database name to perform action on',
            type: 'string'
        },
        input:{
            alias:'i',
            demandOption: true,
            describe: 'Directory where the exports happened',
            type: 'string'
        },
        uri: {
            alias: 'u',
            describe: 'URL/Hostname used to connect with external servers',
            type: 'string'
        }
    },
    (argv) => {

        importsExport(argv.dbName, argv.input);

    })
    .help()
    .argv