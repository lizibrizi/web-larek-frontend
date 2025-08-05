import { EventEmitter } from '../base/events';
import { MainPageModel } from '../models';
import { MainPageView } from '../views';
import { EVENTS, globalEventEmitter } from '../../utils/constants';


//связующее звено между моделью и вьюшкой главной страницы.
//Запрашивает список товаров из модели.
//Говорит вьюшке, что и когда показывать (загрузка, товары, ошибки).
//Реагирует на клики по товарам и эмитит события.

export class MainPagePresenter {
	private view: MainPageView;
	private model: MainPageModel;


    //Сохраняем переданный экземпляр MainPageView.
    //Создаём модель главной страницы.
    //Вызываем setupEvents() — подписка на события.
    //Показываем "загрузка..." (renderIsLoading).
    //Запрашиваем список товаров (getProductList() у модели).

	constructor(view: MainPageView) {
		this.view = view;

		this.model = new MainPageModel();

		this.setupEvents();

		this.view.renderIsLoading();
		this.model.getProductList();
	}


    //Вызывается при клике на товар.
    //Отправляет событие PRODUCT_PREVIEW_CLICK с productId.
    //Это может инициировать открытие страницы/модалки с подробной информацией о товаре.

	public handleProductClick(productId: string) {
		globalEventEmitter.emit(EVENTS.PRODUCT_PREVIEW_CLICK, { productId });
	}

	private setupEvents() {
		globalEventEmitter.on(
			EVENTS.PRODUCT_LIST_LOADED, //Список успешно загружен → отрисовать товары
			this.handleProductListLoaded.bind(this)
		);

		globalEventEmitter.on(
			EVENTS.PRODUCT_LIST_LOAD_FAILED, //Ошибка при загрузке → показать сообщение
			this.handleProductListLoadFailed.bind(this) //важно, чтобы сохранить this внутри методов.
		);
	}


    //Берёт загруженные товары из модели.
    //Просит view отрисовать список.

	private handleProductListLoaded() {
		this.view.renderProductList(this.model.items);
	}


    //В случае ошибки при загрузке товаров:
    //получает объект с сообщением об ошибке (data.error)
    //передаёт его во вьюшку, чтобы показать пользователю.

	private handleProductListLoadFailed(data: { error: string }) {
		this.view.renderError(data.error);
	}
}
