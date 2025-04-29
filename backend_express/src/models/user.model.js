"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    firstname: String,
    lastname: String,
    products: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product"
            },
            amount: Number
        }
    ]
}, { versionKey: false });
exports.User = mongoose_1.default.model("User", userSchema);
