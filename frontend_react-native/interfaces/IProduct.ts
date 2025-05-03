export interface IProduct {
    _id: string;
    productNr: number;
    name: string;
    category: "Food" | "Drink" | "Toys" | "Books" | "Electronics";
    price: number;
}