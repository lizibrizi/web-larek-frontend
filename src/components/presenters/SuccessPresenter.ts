import { SuccessView } from '../views';
import { EVENTS, globalEventEmitter } from '../../utils/constants';


//показывает экран успешного оформления заказа в модальном окне.
export class SuccessPresenter {
	private view: SuccessView;

	constructor(view: SuccessView) {
		this.view = view;

		this.setupHandlers();
	}

    //Закрывает модалку при нажатии кнопки "Готово"
	public handleFinishClick() {
		globalEventEmitter.emit(EVENTS.MODAL_CLOSE);
	}

    //Отображает финальный экран с суммой заказа
	private setupHandlers() {
		globalEventEmitter.on(EVENTS.ORDER_SUBMITTED, (data: { total: number }) =>
			this.handleOrderSubmitted(data.total)
		);
	}

    //Показывает сообщение об успешном заказе
	private handleOrderSubmitted(total: number) {
		globalEventEmitter.emit(EVENTS.MODAL_SET_CONTENT, {
			content: this.view.render(total),
		});

		globalEventEmitter.emit(EVENTS.MODAL_OPEN);
	}
}
