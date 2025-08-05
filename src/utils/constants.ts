import { EventEmitter } from '../components/base/events';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

<<<<<<< HEAD
export const settings = {};

export const globalEventEmitter = new EventEmitter();

export const EVENTS = {
	PRODUCT_LIST_LOADED: 'PRODUCT_LIST_LOADED',
	PRODUCT_LIST_LOAD_FAILED: 'PRODUCT_LIST_LOAD_FAILED',
	PRODUCT_PREVIEW_CLICK: 'PRODUCT_PREVIEW_CLICK',

	PRODUCT_LOADED: 'PRODUCT_LOADED',
	PRODUCT_LOAD_FAILED: 'PRODUCT_LOAD_FAILED',

	MODAL_OPEN: 'MODAL_OPEN',
	MODAL_CLOSE: 'MODAL_CLOSE',
	MODAL_SET_CONTENT: 'MODAL_SET_CONTENT',

	ADD_TO_CART: 'ADD_TO_CART',
	CART_UPDATED: 'CART_UPDATED',
	TO_CHECKOUT_CLICK: 'TO_CHECKOUT_CLICK',

	ORDER_DETAILS_UPDATED: 'ORDER_DETAILS_UPDATED',
	TO_CONTACTS_CLICK: 'TO_CONTACTS_CLICK',
	ORDER_SUBMITTED: 'ORDER_SUBMITTED',
	ORDER_SUBMIT_FAILED: 'ORDER_SUBMIT_FAILED',
} as const;
=======
// Централизованный объект для всех селекторов и id шаблонов
export const settings = {
	modal: {
		container: '#modal-container',
		content: '.modal__content',
		close: '.modal__close',
	},
	page: {
		wrapper: '.page__wrapper',
		catalog: '.gallery',
		basket: '.header__basket',
		basketCounter: '.header__basket-counter',
	},
	card: {
		title: '.card__title',
		price: '.card__price',
		image: '.card__image',
		category: '.card__category',
		description: '.card__text',
		button: '.card__button',
		deleteButton: '.basket__item-delete',
		index: '.basket__item-index',
	},
	basket: {
		list: '.basket__list',
		price: '.basket__price',
		button: '.basket__button',
	},
	form: {
		submit: 'button[type=submit]',
		errors: '.form__errors',
		input: '.form__input',
	},
	success: {
		close: '.order-success__close',
		total: '.order-success__description',
	},
	templates: {
		cardCatalog: '#card-catalog',
		cardPreview: '#card-preview',
		cardBasket: '#card-basket',
		basket: '#basket',
		order: '#order',
		contacts: '#contacts',
		success: '#success',
	},
};
>>>>>>> c0d54a099703cef532cb7e960f35190e15b29e9d
