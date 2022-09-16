import { AuthenticationError } from "apollo-server-express";
import mongo from "@services/mongo";
import { ObjectId } from "mongodb";

export default async (root, args, context, info) => {
    if (!context.user) {
        throw new AuthenticationError();
    }
    let total = 0;
    let status = [];
    let categories = [];

    try {
        const { organization_id } = context.user;

        let results = await mongo
            .db()
            .collection("Items")
            .aggregate([
                { $match: { organization_id: ObjectId(organization_id) } },
                {
                    $group: {
                        _id: "$category.name",
                        total: { $sum: 1 },
                    },
                },
                {
                    $facet: {
                        categories: [{ $sort: { total: -1 } }, { $limit: 30 }],
                        count: [{ $count: "count" }],
                    },
                },
            ])
            .toArray();

        categories = results[0].categories.map(({ _id, total }) => ({
            name: _id,
            total,
        }));
        if (results[0].count[0]) {
            total = results[0].count[0].count;
        } else {
            total = 0;
        }

        results = await mongo
            .db()
            .collection("Items")
            .aggregate([
                {
                    $facet: {
                        complete: [
                            {
                                $match: {
                                    organization_id: ObjectId(organization_id),
                                    "category.status": 1,
                                },
                            },

                            { $count: "total" },
                        ],
                        neutral: [
                            {
                                $match: {
                                    organization_id: ObjectId(organization_id),
                                    "category.status": 0,
                                },
                            },

                            { $count: "total" },
                        ],
                        required: [
                            {
                                $match: {
                                    organization_id: ObjectId(organization_id),
                                    "category.status": -1,
                                },
                            },

                            { $count: "total" },
                        ],
                        undefined: [
                            {
                                $match: {
                                    organization_id: ObjectId(organization_id),
                                    "category.status": -2,
                                },
                            },

                            { $count: "total" },
                        ],
                    },
                },
            ])
            .toArray();

        status = [
            results[0].complete[0] ? results[0].complete[0].total : 0,
            results[0].undefined[0] ? results[0].undefined[0].total : 0,
            results[0].required[0] ? results[0].required[0].total : 0,
        ];

        /*let complete = await mongo
          .db()
          .collection("Items")
          .aggregate([
            { $match: { organization_id: ObjectId(organization_id) } },
            {
              $group: {
                _id: "$category._id",
                name: { $first: "$category.name" },
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
          ]);*/

        /*
        let categories = await mongo
          .db()
          .collection("Items")
          .aggregate([
            {
              $group: {
                _id: "$category._id",
                name: { $first: "$category.name" },
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
          ]);
    
        let c = await categories.toArray();
        let t = await categories.count();
        console.log(t, c);
    
        let manufacturers = await mongo
          .db()
          .collection("Items")
          .aggregate([
            {
              $group: {
                _id: "$manufacturer._id",
                name: { $first: "$manufacturer.name" },
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ])
          .toArray();
    
        console.log(manufacturers);
        */
    } catch (e) {
        console.log(e);
        return null;
    }

    return { total, status, categories };
};
