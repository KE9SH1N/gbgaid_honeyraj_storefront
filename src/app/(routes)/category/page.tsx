import React from "react";
import AllProducts from "../../components/home/AllProducts";
import CategoryList from "../../components/home/CategoryList";
import GlobalLayout from "../../global-layout/GlobalLayout";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<CategoryList />
				<div className="min-h-[100vh] mb-20">
					<AllProducts />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
