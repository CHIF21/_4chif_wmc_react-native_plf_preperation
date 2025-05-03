"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_model_1 = require("../models/user.model");
var product_model_1 = require("../models/product.model");
var router = express.Router();
// GET all users
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.find().populate({
                        path: "products.product",
                        model: "Product",
                        select: "productNr name price category"
                    })];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ error: err_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.findOne({ _id: req.params.id })
                        .populate({
                        path: "products.product",
                        model: "Product",
                        select: "productNr name price category"
                    })];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json({ error: err_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, newUser, savedUser, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname;
                if (!firstname || !lastname) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Firstname and lastname are required",
                            received: req.body
                        })];
                }
                newUser = new user_model_1.User({
                    firstname: firstname,
                    lastname: lastname,
                    products: []
                });
                return [4 /*yield*/, newUser.save()];
            case 1:
                savedUser = _b.sent();
                res.status(201).json(savedUser);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                res.status(500).json({ error: err_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST add product to user cart by productNr
router.post("/:userId/add-product", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productNr, _b, amount, userId, _c, user, product_1, existingIndex, result, err_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, productNr = _a.productNr, _b = _a.amount, amount = _b === void 0 ? 1 : _b;
                userId = req.params.userId;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                if (!productNr || isNaN(amount)) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Invalid input",
                            details: {
                                productNr: "Required, must be a number",
                                amount: "Optional, must be a number"
                            }
                        })];
                }
                return [4 /*yield*/, Promise.all([
                        user_model_1.User.findById(userId),
                        product_model_1.Product.findOne({ productNr: productNr })
                    ])];
            case 2:
                _c = _d.sent(), user = _c[0], product_1 = _c[1];
                if (!user)
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                if (!product_1)
                    return [2 /*return*/, res.status(404).json({ error: "Product with number ".concat(productNr, " not found") })];
                existingIndex = user.products.findIndex(function (p) { var _a; return ((_a = p.product) === null || _a === void 0 ? void 0 : _a.toString()) === product_1._id.toString(); });
                if (existingIndex >= 0) {
                    user.products[existingIndex].amount += amount;
                }
                else {
                    user.products.push({ product: product_1._id, amount: amount });
                }
                return [4 /*yield*/, user.save()];
            case 3:
                _d.sent();
                return [4 /*yield*/, user_model_1.User.findById(userId)
                        .populate({
                        path: "products.product",
                        model: "Product",
                        select: "productNr name price category"
                    })];
            case 4:
                result = _d.sent();
                res.json(result);
                return [3 /*break*/, 6];
            case 5:
                err_4 = _d.sent();
                res.status(500).json({ error: err_4 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// PATCH update product amount in cart by productNr
router.patch("/:userId/update-product", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productNr, amount, userId, _b, user, product_2, productIndex, result, err_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, productNr = _a.productNr, amount = _a.amount;
                userId = req.params.userId;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                if (!productNr || amount === undefined || isNaN(amount)) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Invalid input",
                            details: {
                                productNr: "Required, must be a number",
                                amount: "Required, must be a number"
                            }
                        })];
                }
                return [4 /*yield*/, Promise.all([
                        user_model_1.User.findById(userId),
                        product_model_1.Product.findOne({ productNr: productNr })
                    ])];
            case 2:
                _b = _c.sent(), user = _b[0], product_2 = _b[1];
                if (!user)
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                if (!product_2)
                    return [2 /*return*/, res.status(404).json({ error: "Product with number ".concat(productNr, " not found") })];
                productIndex = user.products.findIndex(function (p) { var _a; return ((_a = p.product) === null || _a === void 0 ? void 0 : _a.toString()) === product_2._id.toString(); });
                if (productIndex === -1) {
                    return [2 /*return*/, res.status(404).json({
                            error: "Product not in cart",
                            productNr: productNr
                        })];
                }
                user.products[productIndex].amount = amount;
                return [4 /*yield*/, user.save()];
            case 3:
                _c.sent();
                return [4 /*yield*/, user_model_1.User.findById(userId)
                        .populate({
                        path: "products.product",
                        model: "Product",
                        select: "productNr name price category"
                    })];
            case 4:
                result = _c.sent();
                res.json(result);
                return [3 /*break*/, 6];
            case 5:
                err_5 = _c.sent();
                res.status(500).json({ error: err_5 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.delete("/:userId/remove-product/:productNr", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, productNr, product, user, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, userId = _a.userId, productNr = _a.productNr;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, product_model_1.Product.findOne({ productNr: Number(productNr) })];
            case 2:
                product = _b.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({
                            error: "Product not found",
                            productNr: productNr
                        })];
                }
                return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(userId, {
                        $pull: {
                            products: { product: product._id }
                        }
                    }, { new: true }).populate({
                        path: "products.product",
                        model: "Product",
                        select: "productNr name price category"
                    })];
            case 3:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            error: "User not found",
                            userId: userId
                        })];
                }
                res.json({ message: "Product removed from cart", });
                return [3 /*break*/, 5];
            case 4:
                err_6 = _b.sent();
                res.status(500).json({ error: err_6 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
