import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const fetchCategoryById = async (id: number) => {
	try {
		const response = await axios.get(`${getBaseUrl(true)}/main-category/${id}`);
		return response.data;
	} catch (error) {
		throw new Error("Failed to fetch product details");
	}
};
