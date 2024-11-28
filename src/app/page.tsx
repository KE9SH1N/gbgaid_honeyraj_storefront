"use client";
import HeroSection from "./components/home/HeroSection";
import BrandService from "./components/home/BrandService";
import BacktotopButton from "./components/footer/BacktotopButton";
import CustomerReview from "./components/home/CustomerReview";
import CategoryList from "./components/home/CategoryList";
import UserRating from "./components/home/UserRating";
import AllProducts from "./components/home/AllProducts";
import FooterTop from "./components/footer/FooterTop";
import FooterMain from "./components/footer/FooterMain";
import PreLoader from "./components/util/loader/PreLoader";
import { useEffect, useState } from "react";
import GlobalLayout from "./global-layout/GlobalLayout";
import BestSelling from "./components/home/BestSelling";

export default function Home() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);
	return (
		<main>
			<div
				className={`${
					loading ? "opacity-100" : "opacity-0"
				} transition-opacity duration-1000 ease-in-out`}
			>
				{loading && <PreLoader />}
			</div>
			<div
				className={`${
					!loading ? "opacity-100" : "opacity-0"
				} transition-opacity ease-in-out duration-2000`}
			>
				{!loading && (
					<>
						<GlobalLayout>
							<HeroSection />
							<CategoryList />
							<BestSelling />
							<AllProducts />
							<UserRating />
							<CustomerReview />
							<BrandService />
							<BacktotopButton />
							<div className="mb-[50px] lg:mb-0">
								<FooterTop />
								<FooterMain />
							</div>
						</GlobalLayout>
					</>
				)}
			</div>
		</main>
	);
}
