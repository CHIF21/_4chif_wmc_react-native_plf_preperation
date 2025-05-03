import express = require("express");
import { User } from "../models/user.model";
import { Product } from "../models/product.model";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().populate({
            path: "products.product",
            model: "Product",
            select: "productNr name price category"
        });

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
            .populate({
                path: "products.product",
                model: "Product",
                select: "productNr name price category"
            });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post("/", async (req : any, res : any) => {
    try {
        const { firstname, lastname } = req.body;

        if (!firstname || !lastname) {
            return res.status(400).json({
                error: "Firstname and lastname are required",
                received: req.body
            });
        }

        const newUser = new User({
            firstname,
            lastname,
            products: []
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({error: err});
    }
});

// POST add product to user cart by productNr
router.post("/:userId/add-product", async (req : any, res : any) => {
    const { productNr, amount = 1 } = req.body;
    const { userId } = req.params;

    try {
        if (!productNr || isNaN(amount)) {
            return res.status(400).json({
                error: "Invalid input",
                details: {
                    productNr: "Required, must be a number",
                    amount: "Optional, must be a number"
                }
            });
        }

        const [user, product] = await Promise.all([
            User.findById(userId),
            Product.findOne({ productNr })
        ]);

        if (!user) return res.status(404).json({ error: "User not found" });
        if (!product) return res.status(404).json({ error: `Product with number ${productNr} not found` });
        const existingIndex = user.products.findIndex(
            p => p.product?.toString() === product._id.toString()
        );

        if (existingIndex >= 0) {
            user.products[existingIndex].amount += amount;
        } else {
            user.products.push({ product: product._id, amount });
        }

        await user.save();

        const result = await User.findById(userId)
            .populate({
                path: "products.product",
                model: "Product",
                select: "productNr name price category"
            });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// PATCH update product amount in cart by productNr
router.patch("/:userId/update-product", async (req : any, res : any) => {
    const { productNr, amount } = req.body;
    const { userId } = req.params;

    try {
        if (!productNr || amount === undefined || isNaN(amount)) {
            return res.status(400).json({
                error: "Invalid input",
                details: {
                    productNr: "Required, must be a number",
                    amount: "Required, must be a number"
                }
            });
        }

        const [user, product] = await Promise.all([
            User.findById(userId),
            Product.findOne({ productNr })
        ]);

        if (!user) return res.status(404).json({ error: "User not found" });
        if (!product) return res.status(404).json({ error: `Product with number ${productNr} not found` });

        const productIndex = user.products.findIndex(
            p => p.product?.toString() === product._id.toString()
        );

        if (productIndex === -1) {
            return res.status(404).json({
                error: "Product not in cart",
                productNr: productNr
            });
        }

        user.products[productIndex].amount = amount;
        await user.save();

        const result = await User.findById(userId)
            .populate({
                path: "products.product",
                model: "Product",
                select: "productNr name price category"
            });

        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/:userId/remove-product/:productNr", async (req : any, res : any) => {
    const { userId, productNr } = req.params;

    try {
        const product = await Product.findOne({ productNr: Number(productNr) });
        if (!product) {
            return res.status(404).json({
                error: "Product not found",
                productNr: productNr
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    products: { product: product._id }
                }
            },
            { new: true }
        ).populate({
            path: "products.product",
            model: "Product",
            select: "productNr name price category"
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
                userId: userId
            });
        }

        res.json({message: "Product removed from cart",});

    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;