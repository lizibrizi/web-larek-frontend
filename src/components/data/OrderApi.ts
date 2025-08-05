import { Api } from '../base/api';
import { API_URL } from '../../utils/constants';
import { IPostOrderResponse, TOrderDetails } from '../../types/order';

export class OrderApi extends Api {
	constructor() {
		super(API_URL);
	}

	public submitOrder(payload: TOrderDetails) {
		return this.post(
			'/order',
			payload
		) as unknown as Promise<IPostOrderResponse>;
	}
}