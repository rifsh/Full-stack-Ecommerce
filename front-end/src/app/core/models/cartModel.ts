import { ResponseProductView } from "./allproducts.model"

export interface Cart {
    datas:{
        products:[ResponseProductView];
        totalPrice:number;
    }
}