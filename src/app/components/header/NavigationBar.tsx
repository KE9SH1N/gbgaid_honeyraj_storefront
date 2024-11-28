import React from "react";
import NavTop from "./NavTop";
import NavMenu from "./NavMenu";

const NavigationBar = () => {
	return (
		<div className="sticky top-0 z-30 lg:bg-[#FFF9F3] lg:shadow-md">
			<NavTop />
			<NavMenu />
		</div>
	);
};

export default NavigationBar;
