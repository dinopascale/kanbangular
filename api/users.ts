// const connectToDatabase = require('./_utils/mongodb')

// module.exports = async (req, res) => {

//     try {
//         const db = await connectToDatabase(process.env.MONGODB_URI)

//         const Collection = await db.collection('users');
    
//         const users = await Collection.find({}).toArray();
    
//         res.status(200).json({users});
//     } catch(e) {
//         console.log(e)
//         res.status(502).json({error: e});
//     }
// }


