import { ModalPresenter } from '../presenters';


//управляет модальным окном:
//  его открытием, закрытием, 
// содержимым и кликами пользователя.
export class ModalView {
	private modalNode: HTMLElement;
	private presenter: ModalPresenter;

	constructor() {
		this.presenter = new ModalPresenter(this);

		this.modalNode = document.getElementById('modal-container');

		this.setupDOMEvents();
	}

    //Открывает или скрывает модальное окно, добавляя/удаляя CSS-класс
	public setShown(isShown: boolean) {
		if (isShown) {
			if (!this.modalNode.classList.contains('modal_active')) {
				this.modalNode.classList.add('modal_active');
			}
		} else {
			this.modalNode.classList.remove('modal_active');
		}
	}


    //Вставляет новый HTML-контент в .modal__content внутри модалки
	public setContent(content: HTMLElement) {
		this.modalNode.querySelector('.modal__content').replaceChildren(content);
	}


    //Настраивает обработчики событий: закрытие при клике вне модалки или по крестику
	private setupDOMEvents() {
		this.modalNode
			.querySelector('.modal__close')
			.addEventListener('click', () => this.presenter.triggerClose());

		this.modalNode.addEventListener('click', (event) =>
			this.presenter.triggerClose()
		);

		this.modalNode
			.querySelector('.modal__container')
			.addEventListener('click', (event) => {
				event.stopPropagation();
			});
	}
}
