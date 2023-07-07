import { Schema, model } from 'mongoose';

const apartmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Apartment = model('Apartment', apartmentSchema);

export default Apartment;
