import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            amount: Number
        }
    ]
}, {versionKey: false});

export const User = mongoose.model("User", userSchema);