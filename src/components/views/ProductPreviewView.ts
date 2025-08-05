import { ProductPreviewPresenter } from '../presenters';
import { TProduct } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { CDN_URL } from '../../utils/constants';


//отвечает за отображение карточки товара в модальном окне, 
//когда пользователь кликает на товар в каталоге.
export class ProductPreviewView {
	private presenter: ProductPreviewPresenter;

    //Создаёт презентер ProductPreviewPresenter и связывает его с этим view
	constructor() {
		this.presenter = new ProductPreviewPresenter(this);
	}

    //Возвращает DOM-элемент с полной карточкой товара
	public render(product: TProduct): HTMLElement {
		const template = cloneTemplate('#card-preview');

		this.setProductData(product, template);

		template
			.querySelector('.card__button')
			.addEventListener('click', () => this.presenter.handleAddToCart());

		return template;
	}


    //Заполняет шаблон карточки данными товара
	private setProductData(product: TProduct, template: HTMLElement) {
		template.querySelector('.card__category').textContent = product.category;
		template.querySelector('.card__title').textContent = product.title;
		template.querySelector('.card__text').textContent = product.description;
		template.querySelector('.card__price').textContent = `${
			product.price || 0
		} синапсов`;

		template
			.querySelector('.card__image')
			.setAttribute('src', `${CDN_URL}${product.image}`);
	}
}
