import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const fetchUserHistoryById = async (userId: number, page: number) => {
	try {
		const response = await axios.get(
			`${getBaseUrl(true)}/order?customerId=${userId}&page=${page}`
		);
		return {
			data: response?.data?.data,
			page,
			totalPages: response?.data?.totalPages,
		};
	} catch (error) {
		throw new Error("Failed to fetch order by user data");
	}
};
