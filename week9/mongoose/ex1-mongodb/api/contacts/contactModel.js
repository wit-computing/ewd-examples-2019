import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is a required property']
  },
  address: String,
  age: {
    type: Number,
    min: 0,
    max: 120,
    required: true
  },
  email: String,
  updated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Contact', ContactSchema);