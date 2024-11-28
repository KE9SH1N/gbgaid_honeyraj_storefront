import React from "react";
import SearchResult from "../../components/search-result/SearchResult";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import GlobalLayout from "../../global-layout/GlobalLayout";

async function getData(query: string | null) {
	const res = await fetch(
		`${getBaseUrl(true)}/products/search?searchProducts=${query}`
	);

	if (!res) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const page = async (params: any) => {
	const searchParam = params.searchParams.search;
	const data = await getData(searchParam);

	return (
		<div>
			<GlobalLayout>
				<SearchResult searchItem={data} searchParam={searchParam} />
			</GlobalLayout>
		</div>
	);
};

export default page;
