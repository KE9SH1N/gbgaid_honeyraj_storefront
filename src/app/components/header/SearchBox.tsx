"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useSearch } from "../../hooks/useSearch";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useEnterKey from "../../hooks/useEnterKey";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const SearchBox: React.FC = () => {
	const [query, setQuery] = useState("");
	const { searchProducts } = useSearch();
	const router = useRouter();

	const handleSearch = async () => {
		await searchProducts(query);
		router.push(`/search-result?search=${query}`);
	};

	const handleSubmit = () => {
		handleSearch();
	};

	// Using the custom hook
	useEnterKey(handleSubmit, "searchInputMobile");

	// For multi-language
	const t = useTranslations("searchBox");

	const selectedLanguage = useSelector(languageSelector);
	return (
		<div className="w-full lg:hidden">
			<div className="flex justify-center p-4">
				<input
					type="text"
					id="searchInputMobile"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={t("mobile-search-placeholder")}
					className=" appearance-none w-full pl-6 pr-4 py-2 border-2 border-black focus:outline-none placeholder:px-2 rounded-md"
				/>

				<button
					onClick={handleSubmit}
					className=" absolute right-10 top-[35%] cursor-pointer"
				>
					<IoSearchOutline className="text-2xl" />
				</button>
			</div>
		</div>
	);
};

export default SearchBox;
