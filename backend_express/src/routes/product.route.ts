import express = require("express");
import { Product } from "../models/product.model";

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.get("/:productNr", async (req : any, res : any) => {
    const product = await Product.findOne({ productNr: parseInt(req.params.productNr) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.patch("/:productNr", async (req : any, res : any) => {
    try {
        const updated = await Product.findOneAndUpdate(
            { productNr: parseInt(req.params.productNr) },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Product not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
