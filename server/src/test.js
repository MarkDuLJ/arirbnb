/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
import dbPromise from "./services/mongo.js";

const agg = [
    {
        '$match': {
            'category.name': 'BALL BEARING'
        }
    }, {
        '$unwind': {
            'path': '$category.attributes'
        }
    }, {
        '$group': {
            '_id': {
                'byName': '$category.attributes.name',
                'bySatus': '$category.attributes.status'
            },
            'count': {
                '$sum': 1
            }
        }
    }
];
async function run(){
    const mongo = await dbPromise
    // console.log(mongo.db("Covia").collection("Items"))
    const res =await mongo.db("Covia").collection('Items').aggregate(agg)

    while(await res.hasNext()){

        console.log(await res.next())
    }
    
    
}

    run()   