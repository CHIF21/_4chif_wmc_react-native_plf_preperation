export interface IProduct {
    productNr: number;
    name: string;
    category: "Food" | "Drink" | "Toys" | "Books" | "Electronics";
    price: number;
}