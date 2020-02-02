const url = require('url');
const MongoClient = require('mongodb').MongoClient;

let chachedDb = null;

async function connectToDatabase(uri) {
    if (chachedDb) return chachedDb;

    try {
        const client = await MongoClient.connect(uri, {useNewUrlParser: true})

        const db = await client.db(url.parse(uri).pathname.substr(1))
    
        chachedDb = db;
        return db;
    } catch(e) {
        throw new Error(e);
    }
}

module.exports = connectToDatabase;