import mongoose from 'mongoose'
const Schema = mongoose.Schema
const componentSchema = new Schema(
  {
    name: { type: String },
    // id: { type: String },
    html: { type: String },
    css: { type: String },
    js: { type: String },
  },
  { collection: 'Components' },
)

const Components = mongoose.model('Components', componentSchema)
export default Components
