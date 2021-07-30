
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
        .argv

        console.log(argv.dbName);
        console.log(argv.query);

const escapeJSON = (jsObj) => {
    return JSON.stringify(jsObj).replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
};


console.log(escapeJSON(argv.query));