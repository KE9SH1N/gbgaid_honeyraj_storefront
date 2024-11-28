import { Product } from "../../types/productType";

const findQuantityForProduct = (
	cartItems: Product[],
	productId: number
): number => {
	const foundItem = cartItems.find((item: Product) => item.id === productId);
	return foundItem ? foundItem.quantity : 0;
};

export { findQuantityForProduct };
