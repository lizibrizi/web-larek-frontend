import { IComponent } from '../../types';

//абстрактный класс, который принимает обобщенный тип и реализует интерфейс
export abstract class Component<T> implements IComponent<T> {
	protected constructor(protected readonly container: HTMLElement) {}

//переключить класс у переданного элемента
	toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		element.classList.toggle(className, force); //класс либо добавится либо удалится
	}

//устанавливает текстовое содержимое
	protected setText(element: HTMLElement, value: unknown): void {
		if (element) {
			element.textContent = String(value);
		}
	}

	//сменить статус блокировки
	setDisabled(element: HTMLElement, state: boolean): void {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}
//скрыть элемент с помощью css
	protected setHidden(element: HTMLElement): void {
		element.style.display = 'none';
	}

//показать элемент
	protected setVisible(element: HTMLElement): void {
		element.style.removeProperty('display');
	}

	//Установить изображение с альтернативным текстом

	protected setImage(
		element: HTMLImageElement,
		src: string,
		alt?: string
	): void {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

//возвращает корневой DOM-элемент
	
	render(data?: T): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}