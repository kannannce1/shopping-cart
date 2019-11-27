export interface IProducts{
    productSku: string;
    productName: string;
    productDescription: string;
    productQty: number;
    productImg: string;
    productPrice: number;
    productCategory: string;
    id?: number
 
}

export interface ICartProduct{
    cartItemId?: number;
    productId: number;
    userId: Number;
    productQtyOrder: number;
    productTotalPrice: Number;
	productName: string;
    productImg: string ;
    dateOrdered :string
    productDescription: string;
    id?: number
}