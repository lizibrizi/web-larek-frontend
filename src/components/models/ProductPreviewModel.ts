import { ProductApi } from '../data/ProductApi';
import { TProduct } from '../../types';
import { EVENTS, globalEventEmitter } from '../../utils/constants';


//Класс управляет состоянием одного товара и загрузкой его данных.
export class ProductPreviewModel {
	public product: TProduct;

	private api: ProductApi;

	constructor() {
		this.api = new ProductApi();
	}


//Метод принимает productId — идентификатор товара, который нужно загрузить.
//Вызывает асинхронный метод, который делает запрос к серверу по этому ID.
//Если запрос успешен, полученный объект сохраняется в this.product.
//Затем вызывается событие PRODUCT_LOADED через globalEventEmitter — сигнализируя, что данные товара доступны.
//В случае ошибки: вызывается событие PRODUCT_LOAD_FAILED, в него передаётся объект с описанием ошибки.

	public async getProduct(productId: string) {
		try {
			this.product = await this.api.getProduct(productId);

			globalEventEmitter.emit(EVENTS.PRODUCT_LOADED);
		} catch (error) {
			globalEventEmitter.emit(EVENTS.PRODUCT_LOAD_FAILED, {
				error: error?.message || error?.error || error,
			});
		}
	}
}
