import { Component } from '../base/Component';
import { CategoryType, ICard, ICardActions } from '../../types';
import { ensureElement } from '../../utils/utils';
import { settings } from '../../utils/constants';

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, protected actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>(settings.card.title, container);
		this._image = container.querySelector(settings.card.image);
		this._price = ensureElement<HTMLElement>(settings.card.price, container);
		this._category = container.querySelector(settings.card.category);
		this._description = container.querySelector(settings.card.description);
		this._button =
			container.querySelector(settings.card.button) ||
			container.querySelector(settings.card.deleteButton);

		// Универсальный обработчик: слушаем клики на всём контейнере
		if (actions?.onClick) {
			container.addEventListener('click', (event: MouseEvent) => {
				// Если у карточки есть собственная кнопка, реагируем только на клики по ней
				if (this._button) {
					if (
						event.target === this._button ||
						(this._button.contains(event.target as Node) &&
							event.currentTarget !== this._button)
					) {
						actions.onClick(event);
					}
				} else {
					// Если кнопки нет, достаточно клика по любой области карточки
					actions.onClick(event);
				}
			});
		}
	}

	/**
	 * Установить ID карточки
	 */
	set id(value: string) {
		this.container.dataset.id = value;
	}

	/**
	 * Установить заголовок
	 */
	set title(value: string) {
		this.setText(this._title, value);
	}

	/**
	 * Установить изображение
	 */
	set image(value: string) {
		const alt = this._title.textContent || '';
		this.setImage(this._image, value, alt);
	}

	/**
	 * Установить цену
	 */
	set price(value: number | null) {
		this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
		if (this._button && !value) {
			this.setDisabled(this._button, true);
		}
	}

	/**
	 * Установить категорию
	 */
	set category(value: CategoryType) {
		this.setText(this._category, value);
		this.toggleClass(
			this._category,
			'card__category_soft',
			value === 'софт-скил'
		);
		this.toggleClass(
			this._category,
			'card__category_other',
			value === 'другое'
		);
		this.toggleClass(
			this._category,
			'card__category_additional',
			value === 'дополнительное'
		);
		this.toggleClass(
			this._category,
			'card__category_button',
			value === 'кнопка'
		);
		this.toggleClass(
			this._category,
			'card__category_hard',
			value === 'хард-скил'
		);
	}

	/**
	 * Установить описание
	 */
	set description(value: string | string[]) {
		// _description может отсутствовать в некоторых шаблонах
		if (!this._description) return;

		if (Array.isArray(value)) {
			// создаём новые узлы на основе оригинального элемента
			const newItems = value.map((str) => {
				const node = this._description.cloneNode() as HTMLElement;
				this.setText(node, str);
				return node;
			});

			// Заменяем старый элемент на полученный список и
			// сохраняем ссылку на первый, чтобы при следующем вызове
			// _description указывал на актуальный узел в DOM
			this._description.replaceWith(...newItems);
			this._description = newItems[0];
		} else {
			this.setText(this._description, value);
		}
	}

	/**
	 * Установить текст кнопки
	 */
	set button(value: string) {
		this.setText(this._button, value);
	}

	/**
	 * Заблокировать кнопку
	 */
	set buttonDisabled(value: boolean) {
		this.setDisabled(this._button, value);
	}
}