import { model, Schema } from 'mongoose'

export const Category = model('Category', new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
}))