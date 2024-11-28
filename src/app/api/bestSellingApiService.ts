import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const fetchBestSellingProducts = createAsyncThunk(
	"data/fetchBestSellingProducts",
	async () => {
		try {
			const response = await axios.get(
				`${getBaseUrl(true)}/products/best-selling?ids=1,2,3,4,5,6,7`
			);
			return {
				data: response.data,
			};
		} catch (error) {
			throw error;
		}
	}
);
