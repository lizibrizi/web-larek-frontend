import { TProduct } from '../../types';
import { EVENTS, globalEventEmitter } from '../../utils/constants';
import { TOrderDetails } from '../../types/order';

export class CartModel { //модель корзины
	public cartItems: TProduct[] = [];

	constructor() {}

	public addItemToCart(product: TProduct) { //добавляем товар в корзину по айди
		const foundItem = this.cartItems.find(({ id }) => product.id === id);

		if (!foundItem) {
			this.cartItems.push(product);

			globalEventEmitter.emit(EVENTS.CART_UPDATED); //уведомляем об изменениях
		}
	}

	public removeItemFromCart(product: TProduct) { //удаляем товар из корзины по айди
		this.cartItems = this.cartItems.filter(({ id }) => id !== product.id);

		globalEventEmitter.emit(EVENTS.CART_UPDATED); //уведомляем об изменениях
	}

	public resetCart() { //полная очистка корзины
		this.cartItems = [];

		globalEventEmitter.emit(EVENTS.CART_UPDATED);
	}

	public calculateTotalPrice() { //считаем сумму всех товаров
		return this.cartItems
			.map(({ price }) => price || 0)
			.reduce((total: number, currentPrice: number) => {
				return total + currentPrice;
			}, 0);
	}

    //возвращает объект с общей суммой и массивом товаров
	public getOrderDetails(): Pick<TOrderDetails, 'total' | 'items'> {
		return {
			total: this.calculateTotalPrice(),
			items: this.cartItems.map(({ id }) => id),
		};
	}
}
