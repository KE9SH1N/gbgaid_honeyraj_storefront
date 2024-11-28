import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const fetchData = createAsyncThunk(
	"data/fetchData",
	async (page: number) => {
		try {
			const response = await axios.get(
				`${getBaseUrl(true)}/products?page=${page}`
			);
			return {
				data: response.data.data,
				page,
				totalPages: response.data.totalPages,
			};
		} catch (error) {
			throw error;
		}
	}
);

export const fetchCategoryData = createAsyncThunk(
	"categorydata/fetchCategoryData",
	async () => {
		try {
			const response = await axios.get(`${getBaseUrl(true)}/main-category`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const fetchAllData = createAsyncThunk("data/fetchallData", async () => {
	try {
		const response = await axios.get(`${getBaseUrl(true)}/products`);
		return response.data.data;
	} catch (error) {
		throw error;
	}
});
