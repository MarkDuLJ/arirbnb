import {MongoClient} from 'mongodb'
const config = {
    "client": {

    },
    "server": {

        "mongo": {
            "url": "mongodb+srv://admin:HMzTCgsGGdqM04hG@cluster0.xhl4z.mongodb.net/uManage?retryWrites=true&w=majority",
            "db": "Covia"
        },
        "endpoint": "https://development.umanagepro.com"
    }
}



const uri = config.server.mongo.url
// const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let client;
let dbPromise;

// if (!process.env.MONGODB_URI) {
//     throw new Error("Please add your Mongo URI to envs");
// }

// if (process.env.NODE_ENV === "development") {
//     if (!global._mongoClientPromise) {
//         client = new MongoClient(uri, options);
//         global._mongoClientPromise = client.connect();
//     }
//     dbPromise = global._mongoClientPromise;
// } else {
    client = new MongoClient(uri, options);
    dbPromise = client.connect();
// }

export function jsonify(val) {
    return JSON.parse(JSON.stringify(val));
}

export default dbPromise;