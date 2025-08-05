export interface IPostOrderResponse {
	id: string;
	total: number;
}

export type TOrderDetails = {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
};
