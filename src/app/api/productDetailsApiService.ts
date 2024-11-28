import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const fetchProductDetailsById = async (product_slug: string) => {
	try {
		const response = await axios.get(
			`${getBaseUrl(true)}/products/${product_slug}`
		);
		return response.data;
	} catch (error) {
		throw new Error("Failed to fetch product details");
	}
};
