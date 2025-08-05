<<<<<<< HEAD
export interface IGetProductListResponse {
	total: number;
	items: TProduct[];
}

export interface IGetProductResponse {
=======
// Типы, относящиеся к товару

// Категории товаров
export type CategoryType =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Описание товара, приходящего из API
export interface IProduct {
>>>>>>> c0d54a099703cef532cb7e960f35190e15b29e9d
	id: string;
	description: string;
	image: string;
	title: string;
<<<<<<< HEAD
	category: string;
	price: number;
}

export type TProduct = IGetProductResponse;
=======
	category: CategoryType;
	price: number | null;
}

// Ответ API cо списком товаров
export interface IProductList {
	total: number;
	items: IProduct[];
}

// Модель каталога товаров (business-logic layer)
export interface ICatalogModel {
	setItems(items: IProduct[]): void;
	getProduct(id: string): IProduct | undefined;
	setPreview(product: IProduct): void;
	getPreview(): IProduct | null;
	isLoading(): boolean;
}
>>>>>>> c0d54a099703cef532cb7e960f35190e15b29e9d
