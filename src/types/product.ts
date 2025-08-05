export interface IGetProductListResponse {
	total: number;
	items: TProduct[];
}

export interface IGetProductResponse {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export type TProduct = IGetProductResponse;
