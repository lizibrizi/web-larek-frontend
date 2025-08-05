import { Api } from '../base/api';
import {
	IGetProductListResponse,
	IGetProductResponse,
} from '../../types/product';
import { API_URL } from '../../utils/constants';

export class ProductApi extends Api {
	constructor() {
		super(API_URL);
	}

	public getProductList() {
		return this.get('/product') as unknown as Promise<IGetProductListResponse>;
	}

	public getProduct(id: string) {
		return this.get(
			`/product/${id}`
		) as unknown as Promise<IGetProductResponse>;
	}
}