import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const fetchDeliveryChargeData = createAsyncThunk(
	"deliveryCharge/fetchDeliveryChargeData",
	async () => {
		try {
			const response = await axios.post(`${getBaseUrl(true)}/order`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);
