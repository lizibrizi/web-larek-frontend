import { SuccessPresenter } from '../presenters';
import { cloneTemplate } from '../../utils/utils';


//представление финального экрана, 
//которое отображается после успешного оформления заказа.
export class SuccessView {
	private presenter: SuccessPresenter;

    //Создаёт и связывает с собой SuccessPresenter
	constructor() {
		this.presenter = new SuccessPresenter(this);
	}

    //Возвращает DOM-элемент с сообщением об успешной оплате и суммой
	public render(total: number) {
		const template = cloneTemplate('#success');

		template.querySelector(
			'.order-success__description'
		).textContent = `Списано ${total} синапсов`;

		template
			.querySelector('.order-success__close')
			.addEventListener('click', () => this.presenter.handleFinishClick());

		return template;
	}
}

//Шаблон берётся из #success.
//Вставляется текст: Списано ${total} синапсов.
//Кнопка "Закрыть" привязывается к методу handleFinishClick() в презентере — она закрывает модалку.