import React from "react";
import NavigationBar from "../components/header/NavigationBar";
import TabBar from "../components/footer/TabBar";
import PopUpToast from "../components/notification/PopUpToast";
import FooterMain from "../components/footer/FooterMain";

const GlobalLayout = ({ children }: any) => {
	return (
		<div>
			<NavigationBar />
			<PopUpToast />
			{children}
			<TabBar />
		</div>
	);
};

export default GlobalLayout;
