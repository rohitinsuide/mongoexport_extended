"use strict";
const { exec } = require("child_process");

const { existsSync, mkdirSync, readdirSync } = require('fs');



const mongoExtend = (dbName, query, output='output') => {

    if( ! existsSync(output) ){
        mkdirSync(output)
    }

    exec(`mongo ${dbName} --quiet --eval "db.getCollectionNames()"`, (error, collectionList, stderr) => {
        if (error) {
            console.log(`Failed to execute due to error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`Failed to execute due to stderr: ${stderr}`);
            return;
        }

        collectionList = JSON.parse(collectionList);
        const collectionLen = collectionList.length;

        if(collectionLen){
            console.log('Total number of collections :- ' + collectionLen);
            
            for(let i = 0; i < collectionList.length; i++){
                const collection = collectionList[i];
                const fileName = `./${output}/${collection}.json`;
                exec(`mongoexport -d ${dbName} -c ${collection} --query ${query} --out ${fileName} --jsonArray`, (error, success, stderr) => {
                    if (error) {
                        console.log(`Failed to execute due to error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(stderr);
                        return;
                    }
                    console.log(`Exported file to ${fileName}`);
                });
            }
        }

        
    });


}


const importsExport = (dbName, input='output') => {

    if( existsSync(input) ){
        readdirSync(input).forEach(file=>{
            if(file.includes('.json')){

                const collection = file.split('.json')[0];
                exec(`mongoimport --uri mongodb://172.20.105.6:27017 -d ${dbName} -c ${collection} --file ./${input}/${file} --jsonArray`, (error, success, stderr) => {
                    if (error) {
                        console.log(`Failed to execute due to error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(stderr);
                        return;
                    }
                    console.log(`Imported file: ${file} to collection: ${collection} in DB: ${dbName}`);
                });
            }
        });
    }
    else{
        console.log('Specified directory doesn\'t exist. Please check the directory name and retry.');
    }


}

module.exports = {mongoExtend, importsExport};