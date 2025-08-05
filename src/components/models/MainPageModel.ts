import { TProduct } from '../../types';
import { EventEmitter } from '../base/events';
import { ProductApi } from '../data/ProductApi';
import { EVENTS, globalEventEmitter } from '../../utils/constants';
import { ProductPreviewView } from '../views';


//Этот класс отвечает за:загрузку списка товаров с сервера,
// хранение списка товаров и общего количества,
// информирование других компонентов о результатах загрузки.


export class MainPageModel {
	public items: TProduct[] = []; //массив товаров, загружаемых с сервера
	public total: number = 0; //общее количество товаров. Изначально 0

	private api: ProductApi;

	constructor() {
		this.api = new ProductApi(); //При создании экземпляра MainPageModel создаётся также экземпляр ProductApi.
	}

	public async getProductList() {
		try {
			const response = await this.api.getProductList();

			this.items = response.items;
			this.total = response.total;

			globalEventEmitter.emit(EVENTS.PRODUCT_LIST_LOADED);
		} catch (error) {
			globalEventEmitter.emit(EVENTS.PRODUCT_LIST_LOAD_FAILED, {
				error: error?.message || error?.error || error,
			});
		}
	}
}
