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

mongoExtend(argv.dbName);