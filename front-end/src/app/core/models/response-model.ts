export class CartResponseModel {
    status?: string;
    message?: string;
    totalPrice?: number;
    totalProducts?: number;
}

export class PaymentResponseModel {
    status: string;
    link: string;
}