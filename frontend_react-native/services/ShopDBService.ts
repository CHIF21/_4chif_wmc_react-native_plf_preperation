import axios from "axios";

const BASE_URL = "http://localhost:3000";

class ShopDBService {

    static async getProducts() {
        const response = await axios.get(BASE_URL + "/products");

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static async getProductByNr(productNr: number) {
        const response = await axios.get(`${BASE_URL}/products/${productNr}`);
        if (response.status === 404) {
            throw new Error("Product not found");
        } else if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    }

    static async createProduct(product: {
        productNr: number;
        name: string;
        price: number;
        [key: string]: any;
    }) {
        const response = await axios.post(BASE_URL + "/products", product);
        if (response.status !== 201) {
            throw new Error(response.statusText);
        }
        return response.data;
    }

    static async updateProduct(productNr: number, updatedData: Partial<{
        name: string;
        price: number;
        [key: string]: any;
    }>) {
        const response = await axios.patch(`${BASE_URL}/products/${productNr}`, updatedData);
        if (response.status === 404) {
            throw new Error("Product not found");
        } else if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    }

    static async getUsers() {
        const response = await axios.get(BASE_URL + "/users");
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
    }

    static async getUserById(userId: number) {
        const response = await axios.get(`${BASE_URL}/users/${userId}`);
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
    }

    static async createUser(firstname: string, lastname: string) {
        const response = await axios.post(BASE_URL + "/users", { firstname, lastname });
        if (response.status !== 201) throw new Error(response.statusText);
        return response.data;
    }

    static async addProductToCart(userId: string, productNr: number, amount = 1) {
        const response = await axios.post(`${BASE_URL}/users/${userId}/add-product`, {
            productNr,
            amount
        });
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
    }

    static async updateProductAmount(userId: string, productNr: number, amount: number) {
        const response = await axios.patch(`${BASE_URL}/users/${userId}/update-product`, {
            productNr,
            amount
        });
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
    }

    static async removeProductFromCart(userId: string, productNr: number) {
        const response = await axios.delete(`${BASE_URL}/users/${userId}/remove-product/${productNr}`);
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
    }

    static async getUserCart(userId: string) {
        const res = await axios.get(`${BASE_URL}/users`);
        return res.data.find((u: any) => u._id === userId)?.products || [];
    }
}

export default ShopDBService;