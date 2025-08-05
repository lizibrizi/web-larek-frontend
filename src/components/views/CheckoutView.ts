import { CheckoutPresenter } from '../presenters';
import { TOrderDetails } from '../../types/order';
import { cloneTemplate } from '../../utils/utils';
import * as querystring from 'querystring';


//управляет визуальной частью оформления заказа,
// то есть отрисовкой форм, валидацией кнопок, 
// отображением ошибок и взаимодействием с CheckoutPresenter.
export class CheckoutView {
	private presenter: CheckoutPresenter;

	private renderersByStep = [
		this.renderOrderStep.bind(this),
		this.renderContactsStep.bind(this),
	];

	constructor() {
		this.presenter = new CheckoutPresenter(this);
	}

    //Отрисовывает нужный шаг оформления заказа (доставка или контакты)
	public renderStep(step: number, details: TOrderDetails) {
		return this.renderersByStep[step](details);
	}

    //Обновляет все поля формы текущими данными
	public updateFormControlsWithDetails(orderDetails: TOrderDetails) {
		this.generateOrUpdatePaymentButtons(document, orderDetails, true);
		this.generateOrUpdateInput('address', document, orderDetails, true);
		this.updateProceedToNextStepButton(orderDetails);

		this.generateOrUpdateInput('email', document, orderDetails, true);
		this.generateOrUpdateInput('phone', document, orderDetails, true);
		this.updateSubmitOrderButton(orderDetails);

		this.renderSubmitError('');
	}

    //Показывает ошибку при отправке формы
	public renderSubmitError(message: string) {
		const errorContainer = document.querySelector(
			'form[name="contacts"] .form__errors'
		);

		if (errorContainer) {
			errorContainer.textContent = message;
		}
	}

    //Показывает состояние загрузки на кнопке
	public setLoading(isLoading: boolean) {
		const submitOrderButton = document.querySelector(
			'form[name="contacts"] .modal__actions button'
		) as HTMLButtonElement;

		if (!submitOrderButton) return;

		submitOrderButton.disabled = isLoading;
		submitOrderButton.textContent = isLoading ? 'Оплата...' : 'Оплатить';
	}

    //Отображает шаг с доставкой и кнопками оплаты
	private renderOrderStep(orderDetails: TOrderDetails) {
		const template = cloneTemplate('#order');

		this.generateOrUpdatePaymentButtons(template, orderDetails);
		this.generateOrUpdateInput('address', template, orderDetails);

		this.updateFormLayoutIfAlreadyExists('order', template);

		template.addEventListener('submit', (event) => {
			event.preventDefault();

			this.presenter.handleProceedToNextStep();
		});

		return template;
	}

    //Отображает шаг с email/телефоном и кнопкой "Оплатить"
	private renderContactsStep(orderDetails: TOrderDetails) {
		const template = cloneTemplate('#contacts');

		this.generateOrUpdateInput('email', template, orderDetails);
		this.generateOrUpdateInput('phone', template, orderDetails);

		this.updateFormLayoutIfAlreadyExists('contacts', template);

		template.addEventListener('submit', (event) => {
			event.preventDefault();

			this.presenter.submitOrder();
		});

		return template;
	}

    //Заменяет текущую форму, если она уже отрисована
	private updateFormLayoutIfAlreadyExists(
		formName: string,
		template: HTMLElement
	) {
		const alreadyRenderedOrderLayout = document.querySelector(
			`form[name="${formName}"]`
		);

		if (alreadyRenderedOrderLayout) {
			alreadyRenderedOrderLayout.replaceWith(template);
		}
	}

    //Устанавливает значение в input и вешает обработчик изменений
	private generateOrUpdateInput(
		name: string,
		templateOrDocument: HTMLElement | Document,
		orderDetails: TOrderDetails,
		skipEventListeners = false
	) {
		const input = templateOrDocument.querySelector(
			`input[name="${name}"]`
		) as HTMLInputElement;

		if (!input) return;

		input.value = `${orderDetails[name as keyof TOrderDetails] || ''}`;

		if (!skipEventListeners) {
			input.addEventListener('input', (event) => {
				this.presenter.updateDetails({
					[name]: (event.target as HTMLInputElement).value,
				});
			});
		}
	}

    //Делает кнопку "Продолжить" активной, если доставка и оплата выбраны
	private updateProceedToNextStepButton(orderDetails: TOrderDetails) {
		const orderButton = document.querySelector(
			'.order__button'
		) as HTMLButtonElement;

		if (!orderButton) return;

		if (orderButton) {
			const canProceed =
				orderDetails.address?.trim().length &&
				orderDetails.payment?.trim().length;

			orderButton.disabled = !canProceed;
		}
	}

    //Делает кнопку "Оплатить" активной, если поля заполнены
	private updateSubmitOrderButton(orderDetails: TOrderDetails) {
		const submitOrderButton = document.querySelector(
			'form[name="contacts"] .modal__actions button'
		) as HTMLButtonElement;

		if (!submitOrderButton) return;

		if (submitOrderButton) {
			const canSubmit =
				orderDetails.email?.trim().length && orderDetails.phone?.trim().length;

			submitOrderButton.disabled = !canSubmit;
		}
	}

    //Устанавливает активную кнопку оплаты, вешает обработчики клика
	private generateOrUpdatePaymentButtons(
		templateOrDocument: HTMLElement | Document,
		orderDetails: TOrderDetails,
		skipEventListeners = false
	) {
		const paymentButtons = templateOrDocument.querySelectorAll(
			'.order__buttons .button'
		);

		if (!paymentButtons) return;

		paymentButtons.forEach((buttonNode: HTMLButtonElement) => {
			if (buttonNode.getAttribute('name') === orderDetails.payment) {
				buttonNode.classList.add('button_alt-active');
			} else {
				buttonNode.classList.remove('button_alt-active');
			}

			if (!skipEventListeners) {
				buttonNode.addEventListener('click', () =>
					this.presenter.updateDetails({ payment: buttonNode.name })
				);
			}
		});
	}
}