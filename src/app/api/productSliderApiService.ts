import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const fetchSliderData = createAsyncThunk(
	"data/fetchSliderData",
	async () => {
		try {
			const response = await axios.get(`${getBaseUrl(true)}/slider`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);
