import mongo from "../services/mongo.js";
import { ObjectId } from "mongodb";

export default async (root, args, context, info) => {
    
    let category = null;

    try {
        const { _id, name } = args.input;
        if (_id) {
            category = await mongo
                .db()
                .collection("Categories")
                .findOne({
                    // organization_id: ObjectId(organization_id),
                    _id: ObjectId(_id),
                });
        } else if (name) {
            category = await mongo
                .db()
                .collection("Categories")
                .findOne({
                    // organization_id: ObjectId(organization_id),
                    name,
                });
        }
    } catch (e) {
        //throw new Error(e);
    }
    return { category };
};
