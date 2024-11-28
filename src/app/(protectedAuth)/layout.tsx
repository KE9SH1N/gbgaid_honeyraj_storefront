"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "../components/authentication/common/Loader";

const Layout = ({ children }: any) => {
	const router = useRouter();
	const selectedLanguage = useSelector(
		(state: any) => state.language.selectedLanguage
	);
	const [isLoading, setIsLoading] = useState(true);
	const token = localStorage.getItem("accessToken");
	useEffect(() => {
		if (!token) {
			setIsLoading(true);
			router.push(`/`);
		} else {
			setIsLoading(false);
		}
	}, [token, router, selectedLanguage]);

	if (isLoading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}
	return (
		<div>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
