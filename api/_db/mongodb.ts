import * as url from 'url';
import { MongoClient, Db } from 'mongodb';

let chachedDb: Db = null;

// maybe it's better as wrapper 

// export function withConnectDB (fn) {
//     const self = this;
//     return async function(...args) {
//         if (chachedDb) {
//             (fn as Function).prototype.kanbanDb = chachedDb;
//             return fn(...args);
//         }

//         try {
//             const client: MongoClient = await MongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true})

//             const db: Db = client.db(url.parse(process.env.MONGODB_URI).pathname.substr(1))

//             chachedDb = db;

//             console.log(fn, 'function', self);

//             const context = {...fn.prototype, db}

//             return fn.apply(context,...args);

//         } catch(e) {
            
//             (fn as Function).prototype.kanbanDbError = e;

//         }
//     }
// }

export async function connectToDatabase(uri: string): Promise<Db> {
    if (chachedDb) return chachedDb;

    try {
        const client: MongoClient = await MongoClient.connect(uri, {useNewUrlParser: true})

        const db: Db = client.db(url.parse(uri).pathname.substr(1))
    
        chachedDb = db;
        return db;
    } catch(e) {
        throw new Error(e);
    }
}