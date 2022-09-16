const attcount = [
    {
        '$match': {
            'category.name': 'WRENCH SOCKET'
        }
    }, {
        '$unwind': {
            'path': '$category.attributes'
        }
    }, {
        '$group': {
            '_id': '$category.attributes.name',
            'total': {
                '$sum': 1
            }
        }
    }
]


//all categories
const agg_cats = [
    {
        '$group': {
            '_id': {
                'byName': '$category.name',
                'byStatus': '$category.status'
            },
            'count': {
                '$sum': 1
            }
        }
    }
]

// for single category, count each attribute status
const agg_category = [
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
]