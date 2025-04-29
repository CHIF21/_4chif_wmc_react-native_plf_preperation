"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.default.Schema({
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
exports.Product = mongoose_1.default.model("Product", productSchema);
