import {IProduct} from "./IProduct";

export interface IUser {
    firstname: string;
    lastname: string;
    products: { product: IProduct; amount: number }[];
}