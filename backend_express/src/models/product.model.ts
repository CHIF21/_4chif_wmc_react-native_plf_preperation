import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productNr: {
        type: Number,
        required: true,
        unique: true
    },
    name: String,
    category: {
        type: String,
        enum: ["Food", "Drink", "Toys", "Books", "Electronics"]
    },
    price: Number
}, { versionKey: false });

export const Product = mongoose.model("Product", productSchema);