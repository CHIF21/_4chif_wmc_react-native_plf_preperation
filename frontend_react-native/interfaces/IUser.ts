import {IProduct} from "./IProduct";

export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    products: { product: IProduct; amount: number }[];
}