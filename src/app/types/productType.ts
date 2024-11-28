export interface Product {
	id: number;
	mainCategory: {
		id: number;
		image: string;
		name_en: string;
		name_bn: string;
		slug: string;
	};
	product_code: string;
	product_slug: string;
	product_title_en: string;
	product_title_bn: string;
	product_image: string;
	product_gallery: any[];
	regular_prices: number;
	current_prices: number;
	quantity: number;
	active_status: number;
	discount_id: number;
	discount_amount: number;
	discount_type: string;
	product_status: string;
	pack_size: string;
	product_weight: number;
	product_weight_type: string;
	product_dec_en: string;
	product_dec_bn: string;
	health_benefits: {
		title_bn: string;
		title_en: string;
		description_bn: string;
		description_en: string;
	};
	brand: string;
	vat: number;
	vendor: string;
	unit: number;
	unit_type: string;
	isComboPack: boolean;
	isShowing: true;
	purchase_masuring_unit: string;
	searchTag: string;
	showingComboId: number;
	sales_masuring_unit: string;
}
