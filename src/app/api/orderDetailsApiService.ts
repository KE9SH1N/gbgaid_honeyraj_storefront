import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const fetchOrderDetailsById = async (OrderNumber: string | string[]) => {
	try {
		const response = await axios.get(
			`${getBaseUrl(true)}/order?orderNumber=${OrderNumber}`
		);
		return response.data;
	} catch (error) {
		throw new Error("Failed to fetch product details");
	}
};
