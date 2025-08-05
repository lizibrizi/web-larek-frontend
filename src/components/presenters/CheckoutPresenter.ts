import { EVENTS, globalEventEmitter } from '../../utils/constants';
import { TOrderDetails } from '../../types/order';
import { CheckoutView } from '../views/CheckoutView';
import { CheckoutModel } from '../models';


//Этот класс управляет процессом оформления заказа:
// от отображения формы до отправки данных и обработки ошибок.
export class CheckoutPresenter { 
	private view: CheckoutView;
	private model: CheckoutModel;


    //Сохраняет переданную вьюшку
    //Создаёт экземпляр модели
    //Подписывается на глобальные события (setupEvents)
	constructor(view: CheckoutView) {
		this.view = view;
		this.model = new CheckoutModel();

		this.setupEvents();
	}


    //Получает новые поля формы от пользователя.
    //Обновляет orderDetails внутри модели (объединяет старое и новое).
    //Модель сама эмитит ORDER_DETAILS_UPDATED.
	public updateDetails(newDetails: Partial<TOrderDetails>) {
		this.model.updateOrderDetails(newDetails);
	}

    //Продвигает шаг оформления вперёд (например, от товаров → к контактам).
    //Модель сама генерирует TO_CONTACTS_CLICK.
	public handleProceedToNextStep() {
		this.model.proceedToNextStep();
	}

    //UI показывает, что идёт отправка (setLoading(true)).
    //Модель отправляет заказ (submitOrder()).
	public submitOrder() {
		this.view.setLoading(true);
		this.model.submitOrder();
	}

	private setupEvents() {
        //	Обновляет поля формы в UI
		globalEventEmitter.on(EVENTS.ORDER_DETAILS_UPDATED, () =>
			this.handleDetailsUpdated()
		);
        //Открывает форму оформления с переданными товарами и суммой
		globalEventEmitter.on(
			EVENTS.TO_CHECKOUT_CLICK,
			(data: Pick<TOrderDetails, 'total' | 'items'>) =>
				this.handleToCheckoutClick(data)
		);

        //Переключает форму на второй шаг — контактные данные
		globalEventEmitter.on(EVENTS.TO_CONTACTS_CLICK, () =>
			this.handleToContactsClick()
		);

        //Показывает сообщение об ошибке
		globalEventEmitter.on(
			EVENTS.ORDER_SUBMIT_FAILED,
			(data: { error: string }) => this.handleSubmitFailed(data.error)
		);

        //Сброс текущего шага оформления
		globalEventEmitter.on(EVENTS.MODAL_CLOSE, () => this.model.resetStep());
	}

    //Когда модель обновила orderDetails, мы передаём эти данные в форму.
    //Поля формы (телефон, email и т.д.) подставляются автоматически.
	private handleDetailsUpdated() {
		this.view.updateFormControlsWithDetails(this.model.orderDetails);
	}


    //Когда пользователь кликает "оформить заказ":
    //Обновляются items и total в модели.
    //Запрашивается у вьюшки HTML-форма текущего шага (renderStep).
    //Открывается модальное окно с этим содержимым.

	private handleToCheckoutClick(
		details: Pick<TOrderDetails, 'total' | 'items'>
	) {
		this.model.updateOrderDetails(details);

		globalEventEmitter.emit(EVENTS.MODAL_SET_CONTENT, {
			content: this.view.renderStep(
				this.model.currentStep,
				this.model.orderDetails
			),
		});

		globalEventEmitter.emit(EVENTS.MODAL_OPEN);
	}


    //Когда пользователь переходит на следующий шаг (контактные данные):
    //Снова рендерится UI текущего шага.
    
	private handleToContactsClick() {
		globalEventEmitter.emit(EVENTS.MODAL_SET_CONTENT, {
			content: this.view.renderStep(
				this.model.currentStep,
				this.model.orderDetails
			),
		});
	}


    //Если заказ не отправился:
    //Показывается сообщение об ошибке.
    //Индикатор загрузки отключается.

	private handleSubmitFailed(errorMessage: string) {
		this.view.renderSubmitError(`Не удалось оформить заказ: ${errorMessage}`);
		this.view.setLoading(false);
	}
}