#!/usr/bin/env node

const mongoExtend = require("./index");

const yargs = require("yargs");

const argv = yargs
        .option('dbName', {
            alias: 'd',
            demandOption: true,
            describe: 'MongoDB Database name to perform action on',
            type: 'string'
        })
        .option('query', {
            alias: 'q',
            demandOption: true,
            describe: 'Query String to search through collections',
            type: 'string'
        })
        .option('output', {
            alias: 'o',
            demandOption: false,
            describe: 'Output file name/location. While specifying directory make sure that the directory exists.',
            type: 'string'
        })
        .argv


const escapeJSON = (jsObj) => {
    return JSON.stringify(jsObj).replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
};

const query = escapeJSON(argv.query);

mongoExtend(argv.dbName, query);