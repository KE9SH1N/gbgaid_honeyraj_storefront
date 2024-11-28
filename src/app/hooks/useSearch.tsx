"use client";
import { useState } from "react";
import { getBaseUrl } from "../lib/helper/getBaseUrl";

export const useSearch = () => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const searchProducts = async (query: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${getBaseUrl(true)}/products/search?searchProducts=${query}`
			);
			if (!response) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setResults(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { results, isLoading, error, searchProducts };
};
