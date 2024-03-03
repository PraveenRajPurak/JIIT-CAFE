import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    itemid: {
      type: String,
      required: true,
      unique: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
  });

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;