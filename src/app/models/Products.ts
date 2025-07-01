import { model, Schema } from 'mongoose'


export const Products = model('Products', new Schema({
    _id: {
        type:
            Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: [{
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    imagePath: {
        type: String,
        required: false
    }
}))
