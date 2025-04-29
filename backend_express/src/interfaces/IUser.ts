export interface IUser {
    firstname: string;
    lastname: string;
    products: { productId: string; amount: number }[];
}