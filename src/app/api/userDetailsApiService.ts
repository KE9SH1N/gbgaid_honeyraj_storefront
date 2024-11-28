import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";
import { handleLogout } from "../lib/common/Logout";

export const fetchUserDetailsById = async (userId: number, token: string) => {
	try {
		const response = await axios.get(`${getBaseUrl(true)}/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error: any) {
		const statusCode = error.response.data.statusCode;

		if (statusCode === 500) {
			handleLogout();
		} else {
			throw new Error(error);
		}
	}
};
