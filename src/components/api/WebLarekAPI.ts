import { Api, ApiListResponse } from '../base/api';
import { IOrder, IOrderResult, IProduct, IWebLarekAPI } from '../../types';

//взаимодействие с сервером
//класс наследуется от базового и гарантирует, что реализует все, что описано в интерфейсе 
export class WebLarekAPI extends Api implements IWebLarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
        //обязательный вызов конструктора родительского объекта
		this.cdn = cdn;
	}

	//Получить список товаров с сервера
    
	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	//Получить товар по ID
	
	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	// Создать заказ
	
	createOrder(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}