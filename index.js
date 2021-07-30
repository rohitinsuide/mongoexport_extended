const { exec } = require("child_process");

const mongoExtend = (dbName) => {

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
            exec('mkdir ./output');
            for(let i = 0; i < collectionList.length; i++){
                const collection = collectionList[i];
                const fileName = `./output/${collection}.json`;
                exec(`mongoexport -d ${dbName} -c ${collection} --query {appname: {$eq: 'bud'}} --out ${fileName}`, (error, success, stderr) => {
                    if(error || stderr){
                        console.log(`Failed to export collection ${collection} from database ${dbName}. Please check if the query key exists in the collection`);
                    }
                    else{
                        console.log(`Exported file to ${fileName}`);
                    }
                });
            }
        }
        //console.log(`stdout: ${collectionList}`);

        
    });


}

module.exports = mongoExtend;