import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export const fetchDivisionData = createAsyncThunk(
	"location/fetchDivisionData",
	async () => {
		try {
			const response = await axios.get(`${getBaseUrl(true)}/divisions`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const fetchDistrictData = createAsyncThunk(
	"district/fetchDistrictData",
	async () => {
		try {
			const response = await axios.get(`${getBaseUrl(true)}/districts`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const fetchDeliveryChargeData = createAsyncThunk(
	"deliveryCharge/fetchDeliveryChargeData",
	async () => {
		try {
			const response = await axios.get(`${getBaseUrl(true)}/delivary-charge`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const fetchThanaData = createAsyncThunk(
	"district/fetchThanaData",
	async () => {
		try {
			const response = await axios.get(`${getBaseUrl(true)}/thana`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);
