import { CartPresenter } from '../presenters';
import { TProduct } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';


//отвечает за визуальное отображение корзины и связь с CartPresenter’ом.
export class CartView {
	private presenter: CartPresenter;
	private cartBadge: HTMLElement;

	constructor() {
		this.presenter = new CartPresenter(this);

		this.cartBadge = document.querySelector('.header__basket');

		this.setupDOMEvents();
	}

    //Показывает количество товаров на иконке корзины
	public renderCartBadge(amount: number) {
		this.cartBadge.querySelector(
			'.header__basket-counter'
		).textContent = `${amount}`;
	}

    //Отрисовывает список товаров в корзине и кнопку "Оформить"
	public renderCartList(cartItems: TProduct[], totalPrice: number) {
		const template = cloneTemplate('#basket');
		template
			.querySelector('.basket__list')
			.replaceChildren(...this.buildCartItemsLayout(cartItems));

		template.querySelector(
			'.basket__price'
		).textContent = `${totalPrice} синапсов`;

		const proceedButton = template.querySelector(
			'.basket__button'
		) as HTMLButtonElement;

		proceedButton.addEventListener('click', () =>
			this.presenter.handleToCheckoutClick()
		);

		proceedButton.disabled = cartItems.length === 0;

		this.updateCartLayoutIfAlreadyExists(template);

		return template;
	}

    //Обрабатывает клик по иконке корзины
	private setupDOMEvents() {
		this.cartBadge.addEventListener('click', () =>
			this.presenter.handleCartBadgeClick()
		);
	}
    
    //Обновляет разметку, если корзина уже показана
	private updateCartLayoutIfAlreadyExists(template: HTMLElement) {
		const alreadyRenderedCartLayout = document.querySelector('.basket');

		if (alreadyRenderedCartLayout) {
			alreadyRenderedCartLayout.replaceWith(template);
		}
	}

    //Строит разметку всех товаров в корзине
	private buildCartItemsLayout(cartItems: TProduct[]) {
		return !cartItems.length
			? 'Корзина пуста'
			: cartItems.map((item, index) => this.cartItemToLayout(item, index));
	}

    //Генерирует HTML для одного товара
	private cartItemToLayout = (product: TProduct, index: number) => {
		const template = cloneTemplate('#card-basket');

		this.setCartItemData(index, product, template);

		return template;
	};

    //Вставляет данные товара в шаблон и вешает обработчик удаления
	private setCartItemData(
		index: number,
		cartItem: TProduct,
		template: HTMLElement
	) {
		template.querySelector('.basket__item-index').textContent = `${index + 1}`;
		template.querySelector('.card__title').textContent = cartItem.title;
		template.querySelector('.card__price').textContent = `${
			cartItem.price || 0
		} синапсов`;

		template.addEventListener('click', () =>
			this.presenter.handleRemoveFromCart(cartItem)
		);
	}
}
