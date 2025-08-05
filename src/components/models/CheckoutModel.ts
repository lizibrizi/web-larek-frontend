import { TOrderDetails } from '../../types/order';
import { EVENTS, globalEventEmitter } from '../../utils/constants';
import { OrderApi } from '../data/OrderApi';

//Этот класс отвечает за: 
// управление текущим шагом в процессе оформления заказа;
// хранение деталей заказа;
// отправку заказа через API;
// уведомление других компонентов через события.

export class CheckoutModel {
	public orderDetails: TOrderDetails;
	public currentStep: number = 0;

	private api: OrderApi;

//При создании экземпляра CheckoutModel создаётся новый экземпляр OrderApi,
//который сохраняется в приватное поле api.
	constructor() {
		this.api = new OrderApi();
	}


    //Метод принимает объект newDetails, который может содержать частичные данные заказа (необязательно все поля).
    // Создаётся новый объект orderDetails, объединяя текущие данные и новые значения.
    // Затем вызывается событие ORDER_DETAILS_UPDATED через globalEventEmitter, 
    // чтобы уведомить другие части приложения, что данные заказа были обновлены.
	public updateOrderDetails(newDetails: Partial<TOrderDetails>) {
		this.orderDetails = { ...this.orderDetails, ...newDetails };

		globalEventEmitter.emit(EVENTS.ORDER_DETAILS_UPDATED);
	}
//Если текущий шаг (currentStep) равен 0, он увеличивается на 1.
// После этого генерируется событие TO_CONTACTS_CLICK, 
// сигнализируя, что пользователь перешёл к следующему этапу оформления заказа
	public proceedToNextStep() {
		if (this.currentStep === 0) this.currentStep += 1;

		globalEventEmitter.emit(EVENTS.TO_CONTACTS_CLICK);
	}

    //Просто сбрасывает текущий шаг к начальному значению (0).
	public resetStep() {
		this.currentStep = 0;
	}

//Внутри try вызывается метод submitOrder() из OrderApi, передавая туда текущие данные заказа (orderDetails).
// Метод работает асинхронно — используется await.
// После успешной отправки:
// вызывается приватный метод resetOrder(), чтобы очистить заказ;
// генерируется событие ORDER_SUBMITTED, в которое передаётся общая сумма (total), полученная из ответа API.
// Если запрос завершился ошибкой:
// вызывается событие ORDER_SUBMIT_FAILED;
// в данные события передаётся сообщение об ошибке (error.message, error.error или сам объект error, в зависимости от структуры).
	
public async submitOrder() {
		try {
			const { total } = await this.api.submitOrder(this.orderDetails);

			this.resetOrder();

			globalEventEmitter.emit(EVENTS.ORDER_SUBMITTED, { total });
		} catch (error) {
			globalEventEmitter.emit(EVENTS.ORDER_SUBMIT_FAILED, {
				error: error?.message || error?.error || error,
			});
		}
	}

//Сначала обнуляется шаг
// Затем orderDetails сбрасывается до пустых значений
// Это означает, что процесс оформления заказа завершён, и модель готова к новому заказу.
	private resetOrder() {
		this.currentStep = 0;

		this.orderDetails = {
			address: '',
			phone: '',
			email: '',
			payment: '',
			items: [],
			total: 0,
		};
	}
}