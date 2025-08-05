import { EVENTS, globalEventEmitter } from '../../utils/constants';
import { ModalView } from '../views';


//Открывает/закрывает модалку (по событиям).
//Передаёт содержимое в модальное окно.
//Связывает события и UI (ModalView).


export class ModalPresenter {
	private view: ModalView;

	constructor(view: ModalView) {
		this.view = view;

		this.setupEvents();
	}


    //Программно закрывает модалку (эмитит событие)
	public triggerClose() {
		globalEventEmitter.emit(EVENTS.MODAL_CLOSE);
	}

    //Реагирует на события:
	private setupEvents() {
		globalEventEmitter.on(EVENTS.MODAL_OPEN, this.handleOpen.bind(this));
        //Модалка появляется
		globalEventEmitter.on(EVENTS.MODAL_CLOSE, this.handleClose.bind(this));
        //Модалка скрывается
		globalEventEmitter.on(
			EVENTS.MODAL_SET_CONTENT, //Устанавливается новое содержимое
			this.handleSetContent.bind(this)
		);
	}


    //Показывает модалку
	private handleOpen() {
		this.view.setShown(true);
	}

    //Скрывает модалку
	private handleClose() {
		this.view.setShown(false);
	}

    //Меняет содержимое модалки
	private handleSetContent(data: { content: HTMLElement }) {
		this.view.setContent(data.content);
	}
}
