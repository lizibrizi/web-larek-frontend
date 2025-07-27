import { Model } from '../base/Model';
import { IBasketModel, IBasketItem, IProduct } from '../../types';
import { IEvents } from '../base/events';

export class BasketModel extends Model<IBasketModel> implements IBasketModel {
	// внутреннее хранилище корзины – не доступно извне
	private _items: Map<string, IBasketItem> = new Map();
	constructor(data: Partial<IBasketModel>, events: IEvents) {
		super(data, events);
	}

	//добавляет товар

	add(product: IProduct): void {
		if (product.price === null) {
			return; // Товары без цены нельзя добавлять в корзину
		}

		this._items.set(product.id, {
			id: product.id,
			title: product.title,
			price: product.price,
		});
		this.emitChanges('basket:changed', this.getItems());
	}

	//удаляет товар

	remove(id: string): void {
		this._items.delete(id);
		this.emitChanges('basket:changed', this.getItems());
	}

//очистить корзину

	clear(): void {
		this._items.clear();
		this.emitChanges('basket:changed', this.getItems());
	}

	//получить общую стоимость товаров в корзине
	 
	getTotal(): number {
		return Array.from(this._items.values()).reduce(
			(total, item) => total + item.price,
			0
		);
	}

	//получить количество товаров в корзине
	 
	getCount(): number {
		return this._items.size;
	}

//проверить, содержится ли товар в корзине
	 
	contains(id: string): boolean {
		return this._items.has(id);
	}

	//получить все товары в корзине
	 
	getItems(): IBasketItem[] {
		return Array.from(this._items.values());
	}
}