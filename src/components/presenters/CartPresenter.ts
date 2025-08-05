import { CartView } from '../views';
import { CartModel } from '../models';
import { EVENTS, globalEventEmitter } from '../../utils/constants';
import { TProduct } from '../../types';

export class CartPresenter { //управляет состоянием корзины и реакцией на пользовательские действия.
	private view: CartView;
	private model: CartModel;

//Сохраняет переданную в конструктор вьюшку.
//Создаёт новую модель корзины.
//Вызывает метод setupEvents(), в котором настраивается реакция на события.
	constructor(view: CartView) {
		this.view = view;
		this.model = new CartModel();

		this.setupEvents();
	}


    //Запрашивает у view HTML для списка товаров (renderCartList).
    //Передаёт товары и сумму из модели.
    //Генерирует событие MODAL_SET_CONTENT, передавая полученный контент.
    //Генерирует событие MODAL_OPEN, чтобы открыть модальное окно.
	public handleCartBadgeClick() {
		globalEventEmitter.emit(EVENTS.MODAL_SET_CONTENT, {
			content: this.view.renderCartList(
				this.model.cartItems,
				this.model.calculateTotalPrice()
			),
		});

		globalEventEmitter.emit(EVENTS.MODAL_OPEN);
	}


    //удаляет товар из корзины
	public handleRemoveFromCart(cartItem: TProduct) {
		this.model.removeItemFromCart(cartItem);
	}

    //Добавляет товар в корзину.
    //После этого генерирует событие MODAL_CLOSE, чтобы закрыть модальное окно.
	public handleAddToCart(product: TProduct) {
		this.model.addItemToCart(product);
		globalEventEmitter.emit(EVENTS.MODAL_CLOSE);
	}


    //Получает детали заказа из модели.
    //Генерирует событие TO_CHECKOUT_CLICK, чтобы инициировать переход к оформлению заказа.
	public handleToCheckoutClick() {
		globalEventEmitter.emit(EVENTS.TO_CHECKOUT_CLICK, {
			...this.model.getOrderDetails(),
		});
	}


    //Подписывается на три события:
    //ADD_TO_CART — вызывает handleAddToCart.
    //CART_UPDATED — вызывает handleCartUpdated.
    //ORDER_SUBMITTED — вызывает handleOrderSubmitted.
    //Таким образом, CartPresenter реагирует на внешние события в приложении.

	private setupEvents() {
		globalEventEmitter.on(EVENTS.ADD_TO_CART, (data: { product: TProduct }) =>
			this.handleAddToCart(data.product)
		);

		globalEventEmitter.on(EVENTS.CART_UPDATED, () => this.handleCartUpdated());

		globalEventEmitter.on(EVENTS.ORDER_SUBMITTED, () =>
			this.handleOrderSubmitted()
		);
	}


    //Вызывает у view метод renderCartBadge, передаёт туда количество товаров.
    //Затем обновляет список товаров на экране через renderCartList.
	private handleCartUpdated() {
		this.view.renderCartBadge(this.model.cartItems.length);

		this.view.renderCartList(
			this.model.cartItems,
			this.model.calculateTotalPrice()
		);
	}

//После оформления заказа — сбрасывает корзину через модель (resetCart).
	private handleOrderSubmitted() {
		this.model.resetCart();
	}
}
