import { ProductPreviewView } from '../views';
import { ProductPreviewModel } from '../models';
import { EVENTS, globalEventEmitter } from '../../utils/constants';


// управляет отображением превью товара в модальном окне,
//  когда пользователь кликает на карточку товара
export class ProductPreviewPresenter {
	private view: ProductPreviewView;
	private model: ProductPreviewModel;

	constructor(view: ProductPreviewView) {
		this.view = view;

		this.model = new ProductPreviewModel();

		this.setupEvents();
	}

	private setupEvents() {
		globalEventEmitter.on(
			EVENTS.PRODUCT_PREVIEW_CLICK,
			this.handleProductClick.bind(this)
		);

		globalEventEmitter.on(
			EVENTS.PRODUCT_LOADED,
			this.handleProductLoaded.bind(this)
		);

		globalEventEmitter.on(
			EVENTS.PRODUCT_LOAD_FAILED,
			this.handleProductLoadFailed.bind(this)
		);
	}

    //Добавляет текущий товар в корзину через глобальное событие
	public handleAddToCart() {
		globalEventEmitter.emit(EVENTS.ADD_TO_CART, {
			product: { ...this.model.product },
		});
	}

    //Загружает товар по ID, открывает модалку с "загрузкой..."
	private handleProductClick(data: { productId: string }) {
		this.model.getProduct(data.productId);

		globalEventEmitter.emit(EVENTS.MODAL_SET_CONTENT, {
			content: 'Грузим продукт...',
		});

		globalEventEmitter.emit(EVENTS.MODAL_OPEN);
	}

    //	Показывает карточку товара в модалке
	private handleProductLoaded() {
		globalEventEmitter.emit(EVENTS.MODAL_SET_CONTENT, {
			content: this.view.render(this.model.product),
		});
	}

    //Показывает сообщение об ошибке в модалке
	private handleProductLoadFailed(data: { error: string }) {
		globalEventEmitter.emit(EVENTS.MODAL_SET_CONTENT, {
			content: `Не удалось загрузить продукт: ${data.error}`,
		});
	}
}
