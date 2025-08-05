import { MainPagePresenter } from '../presenters';
import { TProduct } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';
import { ProductPreviewView } from './ProductPreviewView';
import { ModalView } from './ModalView';
import { CartView } from './CartView';
import { CheckoutView } from './CheckoutView';
import { SuccessView } from './SuccessView';


//отвечает за отображение главной страницы магазина: 
//каталога товаров и инициализацию всех других View.
export class MainPageView {
	private presenter: MainPagePresenter;

	constructor() {
		this.presenter = new MainPagePresenter(this);

		this.initializeChildViews();
	}

    //Отрисовывает карточки товаров в каталоге
	public renderProductList(products: TProduct[]) {
		const productListNode = document.querySelector('.gallery');

		const productsLayout = this.buildProductsLayout(products);

		productListNode.replaceChildren(...productsLayout);
	}

    //Показывает сообщение об ошибке при загрузке товаров
	public renderError(errorMessage: string) {
		const productListNode = document.querySelector('.gallery');

		productListNode.replaceChildren(
			`Не удалось загрузить каталог: ${errorMessage}`
		);
	}

    //Показывает сообщение "Грузим каталог..."
	public renderIsLoading() {
		const productListNode = document.querySelector('.gallery');

		productListNode.replaceChildren('Грузим каталог...');
	}

    //Инициализирует все остальные View'хи: 
    //модалка, корзина, оформление и т.д.
	private initializeChildViews() {
		new ModalView();
		new ProductPreviewView();
		new CartView();
		new CheckoutView();
		new SuccessView();
	}

    //Генерирует массив карточек товаров
	private buildProductsLayout(products: TProduct[]) {
		return products.map((product) => this.productToLayout(product));
	}

    //Создаёт DOM-элемент карточки товара
	private productToLayout = (product: TProduct) => {
		const template = cloneTemplate('#card-catalog');

		this.setProductData(product, template);

		template.addEventListener('click', () =>
			this.presenter.handleProductClick(product.id)
		);

		return template;
	};

    //Заполняет шаблон карточки данными о товаре
	private setProductData(product: TProduct, template: HTMLElement) {
		template.querySelector('.card__category').textContent = product.category;
		template.querySelector('.card__title').textContent = product.title;
		template.querySelector('.card__price').textContent = `${
			product.price || 0
		} синапсов`;

		template
			.querySelector('.card__image')
			.setAttribute('src', `${CDN_URL}${product.image}`);
	}
}
