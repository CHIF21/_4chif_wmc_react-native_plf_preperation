import mongoose from "mongoose";
import {Product} from "../models/product.model";
import {mock_products} from "../mockdb/mock_products";

const DB_URL = "mongodb://localhost:27017/shop";

mongoose.connect(DB_URL);

mongoose.connection.once("open", async () => {
    console.log("Connected to MongoDB");
    await initializeDB();
});

export async function initializeDB() {
    try {
        await Product.deleteMany();
        const inserted = await Product.insertMany(mock_products);
        console.log("DB initialized with products:", inserted.length);
    } catch (err) {
        console.error("Error initializing DB:", err);
    }
}