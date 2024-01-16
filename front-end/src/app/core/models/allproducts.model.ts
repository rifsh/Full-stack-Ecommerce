export class ProductModel {
    id:number;
    image:string;
    title:string;
    author:string;
    type:string;
    dessc:string;
    price:number;
    quandity?:number = 1;
}
export class ResponseProductView {
    _id:string;
    image:string;
    title:string;
    author:string;
    category:string;
    description:string;
    price:number;
}
export class ResponseProduct {
    id?: string;
    totalProducts?: number;
    datas;
    totalPrice: number;
}